import Workday from '../models/workday.js'
import Worktime from '../models/worktimes.js'
import User from '../models/user.js'
import { httpError } from '../helpers/handleErrors.js'
import { sequelize } from '../config/mysql.js'
import { matchedData } from 'express-validator'
import { handleResponse } from '../helpers/handleResponse.js'

const getConfig = async (request, response) => {
    try {
        const idProfesional = request.params.idProfesional
        const result = await User.getProfesionalByIdV1(idProfesional)
        if (result){
            const status = 200
            const message = ''
            handleResponse(response, status, message, result)
            return
        }
        else {
            const status = 404
            const message = 'Profesional not found'
            handleResponse(response, status, message)
            return
        }
    } catch (error) {
        httpError(response, error)
    }
}

const getAllConfig = async (request, response) => {
    try {
        const { search, page, orderColumn, orderDirection } = request.query
        const order = orderColumn ? [orderColumn, orderDirection ? orderDirection : "ASC"] : ["id", "ASC"]
        const result = await User.getAllScheduleConfig(search ? search : "", page ? page - 1 : 0, order)
        response.send(result)
    } catch (error) {
        httpError(response, error)
    }
}

const setConfig = async (request, response) => {
    try {
        const idProfesional = request.params.idProfesional
        request = matchedData(request)
        console.log(request)
        await sequelize.transaction(async (t) => {
            const config = await Workday.getByProfesionalIdV2(idProfesional)
            //elimina la configuracion actual si existe alguna
            if (config) {
                await Promise.all(
                    config.map(async element => {
                        await Promise.all(element.worktimes.map(async (element) => {
                            await Worktime.destroy({ where: { idWorkday: element.idWorkday }, transaction: t, force: true })
                        }))
                    })
                )
                //no borrar los workdays, mejor actializarl el estado enabled segun los id's
                await Workday.destroy({ where: { idProfesional: idProfesional }, transaction: t, force: true })
            }
            //crear la nueva configuracion
            await Promise.all(
                request.workdays.map(async (workday) => {
                    const { idDay, enabled } = workday
                    //entonces no tendria que crear los workdays cada vez que cambie la agenda de un profesional
                    const result = await Workday.create({ idDay, enabled, idProfesional }, { transaction: t })
                    if (result){
                        await Promise.all(workday.worktimes.map(async (worktime) => {
                            const { startTime, endTime } = worktime
                            await Worktime.create({ idWorkday: result.id, startTime, endTime }, { transaction: t })
                        })) 
                    }
                })
            )
        })
        const result = await Workday.getByProfesionalIdV2(idProfesional)
        response.send(result)
        return
    } catch (error) {
        httpError(response, error)
    }
}

const deleteConfig = async (request, response) => {
    try {
        const idProfesional = request.params.idProfesional
        await sequelize.transaction(async (t) => {
            const config = await Workday.getByProfesionalIdV2(idProfesional)
            if (config) {
                console.log({message: 'hola'})
                await Promise.all(
                    config.map(async element => {
                        await Promise.all(element.worktimes.map(async (element) => {
                            await Worktime.destroy({ where: { idWorkday: element.idWorkday }, transaction: t, force: true })
                        }))
                    })
                )
                await Workday.destroy({ where: { idProfesional: idProfesional }, transaction: t, force: true })
            }
        })
        const result = await Workday.getByProfesionalIdV2(idProfesional)
        response.send(result)
        return
    } catch (error) {
        httpError(response, error)
    }
}

export { getAllConfig, getConfig, setConfig, deleteConfig }