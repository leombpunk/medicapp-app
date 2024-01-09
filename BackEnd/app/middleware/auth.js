import { USER_ROLES } from '../constants/roles.js'
import { verifyToken } from '../helpers/generateToken.js'
import { handleResponse } from '../helpers/handleResponse.js'
import User from '../models/user.js'

const tokenSecretKey = process.env.JWT_SECRET
const refreshTokenSecretKey = process.env.JWT_RT_SECRET

const checkAuth = async (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token, tokenSecretKey)

        // Check is a valid token
        if(!tokenData.username) {
            const status = 401
            const message = "The token is invalid or doesn't exist"
            handleResponse(response, status, message)
            return
        }

        // Check is not a deleted accound
        const user = await User.findOne({ where: tokenData.id, raw: true })
        if (user.isDeleted) {
            const status = 401
            const message = "The token is invalid"
            handleResponse(response, status, message)
            return
        }

        next()
    } catch (error) {
        const status = 401
        const message = "The token is invalid or doesn't exist"
        handleResponse(response, status, message)
    }
}

const checkAdmin = async (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token, tokenSecretKey)

        // Check is a valid token
        if(!tokenData.username) {
            const status = 401
            const message = "The token is invalid or doesn't exist"
            handleResponse(response, status, message)
            return
        }

        // Check is not a deleted account
        const user = await User.findOne({ where: tokenData.id, raw: true })
        if (user.isDeleted) {
            const status = 401
            const message = "The token is invalid"
            handleResponse(response, status, message)
            return
        }

        // Check is a admin account
        if(tokenData.role.id !== USER_ROLES.Admin) {
            const status = 401
            const message = "You do not have permissions to perform this operation"
            handleResponse(response, status, message)
            return
        }

        next()
    } catch (error) {
        const status = 401
        const message = "The token is invalid or doesn't exist"
        handleResponse(response, status, message)
    }
}

const checkUser = async (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token, tokenSecretKey)
        const idUser = Number(request.params.id)

        // Check is a valid token
        if(!tokenData.username) {
            const status = 401
            const message = "The token is invalid or doesn't exist"
            handleResponse(response, status, message)
            return
        }

        // Check is not a deleted accound
        const user = await User.findOne({ where: tokenData.id, raw: true })
        if (user.isDeleted) {
            const status = 401
            const message = "The token is invalid"
            handleResponse(response, status, message)
            return
        }

        //console.log(tokenData.role.id === USER_ROLES.User, idUser !== tokenData.id, tokenData.role.id === USER_ROLES.User && idUser !== tokenData.id)
        //if((tokenData.role.id !== USER_ROLES.Admin) || (tokenData.role.id === USER_ROLES.User && idUser !== tokenData.id)) {
        if((tokenData.role.id !== USER_ROLES.Admin && idUser !== tokenData.id)) {
            const status = 401
            const message = "You do not have permissions to perform this operation"
            handleResponse(response, status, message)
            return
        }
        next()
    } catch (error) {
        console.log(error)
        response.status(409)
        response.send({
            status: response.statusCode,
            message: 'You do not have permissions to perform this operation'
        })
    }
}

export { checkAuth, checkAdmin, checkUser }