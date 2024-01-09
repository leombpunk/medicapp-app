import { sequelize } from "../config/mysql.js"
import { httpError } from "../helpers/handleErrors.js"
import { handleResponse, handleResponseCustomStatus } from "../helpers/handleResponse.js"
import Charge from "../models/charge.js"

const getCharges = async (request, response) => {    
    try {
        const results = await Charge.findAll({ order: sequelize.col('id') })
        const status = 200
        const message = ''
        handleResponse(response, status, message, results)
    } catch (error) {
        httpError(response, error)
    }
}

const getChargesSearcher = async (request, response) => {
    try {
        const { search, page, order: stringOrder } = request.query
        const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']
        //const order = orderColumn ? [orderColumn, orderDirection ? orderDirection : 'ASC'] : ['id', 'ASC']
        const results = await Charge.getPage(search ? search : '', page ? page - 1 : 0, order)
        // console.log(results)
        const status = 200
        const message = ''
        handleResponse(response, status, message, results)
    } catch (error) {
        // console.log(error)
        httpError(response, error)
    }
}

const createCharge = (request, response) => {
    try {
        const { description } = request.body
        Charge.create({
            description
        })
        .then(result => {
            const status = 201
            const message = 'Charge create successfully'
            handleResponse(response, status, message, result)
        })
        .catch(error => {
            console.log(error)
            const errorNumber = Number(error?.original?.errno)
            if (errorNumber === 1062) {
                console.log(error)
                const httpStatus = 409
                const status = 1062
                const message = `Description is duplicate`
                handleResponseCustomStatus(response, httpStatus, status, message)
                return
            }
            const status = 500
            const message = `An error occurred while trying to create the charge: ${error.errors[0].message}`
            handleResponse(response, status, message)
        })
    } catch (error) {
        httpError(response, error)
    }
}

const updateCharge = async (request, response) => {
    try {
        const { id } = request.params
        const { description } = request.body

        const charge = await Charge.findOne({ where: { id } })

        if (!charge) {
            const status = 404
            const message = 'Charge is not found or does not exist'
            handleResponse(response, status, message)
            return
        }

        await charge.update({ description })

        const status = 200
        const message = 'Charge updated successfully'
        handleResponse(response, status, message, charge)
    } catch (error) {
        const errorNumber = Number(error?.original?.errno)
        if (errorNumber === 1062) {
            console.log(error)
            const httpStatus = 409
            const status = 1062
            const message = `Description is duplicate`
            handleResponseCustomStatus(response, httpStatus, status, message)
            return
        }
        httpError(response, error)
    }
}

const deleteCharge = async (request, response) => {
    try {
        const { id } = request.params
        const charge = await Charge.findOne({ where: { id } })

        if (!charge) {
            const status = 404
            const message = 'Charge is not found or does not exist'
            handleResponse(response, status, message)
            return
        }

        await charge.destroy()

        const status = 200
        const message = 'Charge deleted successfully'
        handleResponse(response, status, message)
    } catch (error) {
        httpError(response, error)
    }
}

export {
    getCharges,
    getChargesSearcher,
    createCharge,
    updateCharge,
    deleteCharge
}