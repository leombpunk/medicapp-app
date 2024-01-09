import { BuenosAires, getDayInTimeZone, getStringDateInTimeZone, isDateTimeEnabled } from '../constants/time.js'
import { TURN_STATUS } from '../constants/turnstatus.js'
import { getTokenFromRequest } from '../helpers/generateToken.js'
import { httpError } from '../helpers/handleErrors.js'
import { handleResponse, handleResponseCustomStatus } from '../helpers/handleResponse.js'
import NewWorktime from '../models/new_worktimes.js'
import Turn from '../models/turn.js'

const getTurns = async (request, response) => {
    try {
        const {
            idPatient,
            idProfesional,
            idTreatment,
            status,
            page,
            startTime,
            endTime,
            order: stringOrder,
        } = request.query

        const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']
        const { total_pages, results: data } = await Turn.getPage({
            idPatient: idPatient ?? undefined,
            idProfesional: idProfesional ?? undefined,
            idTreatment: idTreatment ?? undefined,
            page: page ? Number(page) - 1 : 0,
            startTime,
            endTime,
            status: status ?? '',
            order,
        })

        response.send({ status: 200, message: '', data, total_pages })
    } catch (error) {
        httpError(response, error)
    }
}

const getTurn = async (request, response) => {
    try {
        const { id } = request.params
        const result = await Turn.getByID(id)

        if (result) {
            const status = 200
            const message = ''
            handleResponse(response, status, message, result)
        } else {
            const status = 404
            const message = 'Turn not found'
            handleResponse(response, status, message)
        }
    } catch (error) {
        httpError(response, error)
    }
}

const createTurn = async (request, response) => {
    try {
        const { idProfesional, idPatient, idTreatment, dateTime, duration, description } =
            request.body
        const accessToken = await getTokenFromRequest(request)
        const createdBy = accessToken.id

        const worktimes = await NewWorktime.findAll({
            where: { idProfesional },
            raw: true,
        })

        if (!worktimes.length) {
            const httpStatus = 403
            const status = 50000
            const message = "The profesional doesn't have configured worktimes"
            handleResponseCustomStatus(response, httpStatus, status, message)
            return
        }

        const day = getDayInTimeZone(new Date(dateTime), BuenosAires)
        const date = getStringDateInTimeZone(new Date(dateTime), BuenosAires)
        const wt = worktimes
            .filter((w) => w.idDay === day)
            .map((w) => ({
                startTime: new Date(
                    `${date}T${w.startTime}${BuenosAires.numeric}`
                ),
                endTime: new Date(`${date}T${w.endTime}${BuenosAires.numeric}`),
            }))

        if (!isDateTimeEnabled(new Date(dateTime), duration, wt)) {
            const httpStatus = 403
            const status = 50002
            const message = 'The turn is out of profesional worktimes'
            handleResponseCustomStatus(response, httpStatus, status, message)
            return
        }

        Turn.create({
            createdBy,
            idProfesional,
            idPatient,
            idTreatment,
            dateTime,
            duration,
            description,
        })
            .then((result) => {
                const status = 201
                const message = 'Turn create successfully'
                handleResponse(response, status, message, result)
            })
            .catch((error) => {
                console.log({ error })
                if (
                    [50001, 23000].includes(Number(error?.original?.sqlState))
                ) {
                    const httpStatus = 409
                    const status = 50001
                    const message = `An error occurred while trying to create the turn: The chosen time and day are not available`
                    handleResponseCustomStatus(
                        response,
                        httpStatus,
                        status,
                        message
                    )
                } else {
                    const status = 500
                    const message = `An error occurred while trying to create the turn: ${error.message}`
                    handleResponse(response, status, message)
                }
            })
    } catch (error) {
        httpError(response, error)
    }
}

const updateTurn = async (request, response) => {
    try {
        const { id } = request.params
        const { idTreatment, dateTime, duration, description } = request.body
        const accessToken = await getTokenFromRequest(request)
        const modifiedBy = accessToken.id

        /* Check turn exists */
        const turn = await Turn.findOne({ where: { id } })
        const idProfesional = turn.idProfesional

        if (!turn) {
            const status = 404
            const message = 'Turn is not found or does not exist'
            handleResponse(response, status, message)
            return
        }

        /* Check Worktimes */
        const worktimes = await NewWorktime.findAll({
            where: { idProfesional },
            raw: true,
        })

        if (!worktimes.length) {
            const httpStatus = 403
            const status = 50000
            const message = "The profesional doesn't have configured worktimes"
            handleResponseCustomStatus(response, httpStatus, status, message)
            return
        }

        const day = getDayInTimeZone(new Date(dateTime), BuenosAires)
        const date = getStringDateInTimeZone(new Date(dateTime), BuenosAires)
        const wt = worktimes
            .filter((w) => w.idDay === day)
            .map((w) => ({
                startTime: new Date(
                    `${date}T${w.startTime}${BuenosAires.numeric}`
                ),
                endTime: new Date(`${date}T${w.endTime}${BuenosAires.numeric}`),
            }))

        if (!isDateTimeEnabled(new Date(dateTime), duration, wt)) {
            const httpStatus = 403
            const status = 50002
            const message = 'The turn is out of profesional worktimes'
            handleResponseCustomStatus(response, httpStatus, status, message)
            return
        }

        /* Update turn */
        await turn.update({ modifiedBy, idTreatment: idTreatment ?? null, dateTime, duration, description })

        const status = 200
        const message = 'Turn updated successfully'
        handleResponse(response, status, message, turn)
    } catch (error) {
        console.log({ error })
        if ([50001, 23000].includes(Number(error?.original?.sqlState))) {
            const httpStatus = 409
            const status = 50001
            const message = `An error occurred while trying to update the turn: The chosen time and day are not available`
            handleResponseCustomStatus(response, httpStatus, status, message)
        } else {
            const status = 500
            const message = `An error occurred while trying to update the turn: ${error.message}`
            handleResponse(response, status, message)
        }
        //httpError(response, error)
    }
}

const deleteTurn = async (request, response) => {
    try {
        const { id } = request.params

        const turn = await Turn.findOne({ where: { id } })

        if (!turn) {
            const status = 404
            const message = 'Turn is not found or does not exist'
            handleResponse(response, status, message)
            return
        }

        await turn.destroy()

        const status = 200
        const message = 'Turn deleted successfully'
        handleResponse(response, status, message, turn)
    } catch (error) {
        console.log(error)
        httpError(response, error)
    }
}

const confirmTurn = async (request, response) => {
    try {
        const { id } = request.params
        const accessToken = await getTokenFromRequest(request)
        const modifiedBy = accessToken.id

        const turn = await Turn.findOne({ where: { id } })

        if (!turn) {
            const status = 404
            const message = 'Turn is not found or does not exist'
            handleResponse(response, status, message)
            return
        }

        await turn.update({ status: TURN_STATUS.Confirmed })

        const status = 200
        const message = 'Turn updated successfully'
        handleResponse(response, status, message, turn)
    } catch (error) {
        console.log(error)
        if ([50001, 23000].includes(Number(error?.original?.sqlState))) {
            const httpStatus = 409
            const status = 50001
            const message = `An error occurred while trying to update the turn: The chosen time and day are not available`
            handleResponseCustomStatus(response, httpStatus, status, message)
        } else {
            const status = 500
            const message = `An error occurred while trying to update the turn: ${error.message}`
            handleResponse(response, status, message)
        }
        //httpError(response, error)
    }
}

const getReports = async (request, response) => {
    try {
        const {
            searchDate,
            searchProfesional,
            page,
            order: stringOrder,
        } = request.query
        console.log({ searchDate, searchProfesional, page, order: stringOrder })
        const order = stringOrder
            ? JSON.parse(stringOrder)
            : ['dateTime', 'ASC']
        const turns = await Turn.getPageHome(
            searchDate
                ? searchDate
                : new Date().toLocaleDateString('en-CA', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                  }),
            searchProfesional,
            page ? Number(page) - 1 : 0,
            order
        )
        // const { date, profesionalId } = request.params
        // const turns = await Turn.findAll({
        //   where: {
        //     [Op.and]: [
        //       sequelize.where(
        //         sequelize.fn("date", sequelize.col("dateTime")),
        //         "=",
        //         date
        //       ),
        //       profesionalId && profesionalId > 0 && { idProfesional: profesionalId }
        //     ].filter(Boolean), // Filtrar elementos falsy para excluir condiciones undefined o null
        //   },
        //   include: ["profesional", "patient", "treatment"],
        // })
        if (turns) {
            const status = 200
            const message = ''
            const data = turns
            handleResponse(response, status, message, data)
            return
        } else {
            const status = 404
            const message = 'Not found turns'
            const data = turns
            handleResponse(response, status, message, data)
            return
        }
    } catch (error) {
        httpError(response, error)
    }
}

export {
    getTurns,
    getTurn,
    createTurn,
    updateTurn,
    deleteTurn,
    confirmTurn,
    getReports,
}
