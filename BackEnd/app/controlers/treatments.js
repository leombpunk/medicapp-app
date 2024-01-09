import { httpError } from '../helpers/handleErrors.js'
import { handleResponse } from '../helpers/handleResponse.js'
import Treatment from '../models/treatment.js'

const getTreatments = async (request, response) => {
    try {
        const { search, page, order: stringOrder } = request.query
        const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']
        const results = await Treatment.getPage(search ? search : '', page ? Number(page) - 1 : 0, order)

        const status = 200
        const message = ''
        handleResponse(response, status, message, results)
    } catch (error) {
        httpError(response, error)
    }
}

const createTreatment = (request, response) => {
    try {
        const { description, price } = request.body

        Treatment.create({ description, price })
        .then(result => {
            const status = 201
            const message = 'Treatment create successfully'
            handleResponse(response, status, message, result)
        })
        .catch(error => {
            console.log(error)
            const status = 500
            const message = `An error occurred while trying to create the treatment: ${error.message}`
            handleResponse(response, status, message)
        })
    } catch (error) {
        httpError(response, error)
    }
}

const updateTreatment = async (request, response) => {
    try {
        const { id } = request.params
        const { description, price } = request.body

        const treatment = await Treatment.findOne({ where: { id } })

        if (!treatment) {
            const status = 404
            const message = 'Treatment is not found or does not exist'
            handleResponse(response, status, message)
            return
        }

        await treatment.update({ description, price })

        const status = 200
        const message = 'Treatment updated successfully'
        handleResponse(response, status, message, treatment)
    } catch (error) {
        httpError(response, error)
    }
}

const deleteTreatment = async (request, response) => {
    try {
        const { id } = request.params
        const treatment = await Treatment.findOne({ where: { id } })

        if (!treatment) {
            const status = 404
            const message = 'Treatment is not found or does not exist'
            handleResponse(response, status, message)
            return
        }

        await treatment.destroy()

        const status = 200
        const message = 'Treatment deleted successfully'
        handleResponse(response, status, message)
    } catch (error) {
        httpError(response, error)
    }
}

export {
    getTreatments,
    createTreatment,
    updateTreatment,
    deleteTreatment
}