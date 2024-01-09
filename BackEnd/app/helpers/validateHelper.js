import { validationResult } from 'express-validator'
import { handleResponse } from './handleResponse.js'

const validateResult = (request, response, next) => {
    try {
        validationResult(request).throw()
        return next()
    } catch (error) {
        const status = 403
        const message = 'The request body is invalid'
        const errors = error.array().map(error => `${error.param}: ${error.msg}`)
        handleResponse(response, status, message, undefined, errors)
    }
}

export { validateResult }