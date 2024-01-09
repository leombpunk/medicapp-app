import { getTokenFromRequest, tokenSign } from '../helpers/generateToken.js'
import { encrypt, compare } from '../helpers/handleBcrypt.js'
import { httpError } from '../helpers/handleErrors.js'
import { handleResponse } from '../helpers/handleResponse.js'
import { sendMail } from '../helpers/sendMail.js'
import User from '../models/user.js'

const tokenSecretKey = process.env.JWT_SECRET
const refreshTokenSecretKey = process.env.JWT_RT_SECRET

const loginCtrl = async (request, response) => {
    try {
        const { user: usernameOrMail, password } = request.body
        
        const user = await User.getByUsernameOrMail(usernameOrMail)
        
        if (!user) {
            const status = 404
            const message = 'User not found'
            handleResponse(response, status, message)
            return
        }

        const userResume = { 
            id: user.id,
            username: user.username,
            charge: user.charge,
            role: user.role
        }

        const checkPassword = await compare(password, user.password)
        const accessToken = await tokenSign(userResume, tokenSecretKey, '24h')
        const refreshToken = await tokenSign(userResume, refreshTokenSecretKey, '30d')

        if (checkPassword) {
            const status = 200
            const message = 'Login user sucessfully'
            const data = {
                id: user.id,
                names: user.names,
                surnames: user.surnames,
                username: user.username,
                charge: user.charge,
                role: user.role,
                mail: user.mail,
                phone: user.phone,
                token: accessToken,
                refreshToken: refreshToken
            }

            handleResponse(response, status, message, data)
        } else {
            const status = 409
            const message = 'Invalid password'
            handleResponse(response, status, message)
        }

    } catch (error) {
        httpError(response, error)
    }
}

const updateCtrl = async (request, response) => {
    try {
        const accessToken = await getTokenFromRequest(request)
        const idUser = accessToken.id
        const { username, names, surnames, mail, phone, idCharge } = request.body

        let user = await User.getByID(idUser)

        if (!user) {
            const status = 404
            const message = 'User is not found or does not exist'
            handleResponse(response, status, message)
            return
        }

        // Update user
        await user.update({ username, names, surnames, mail, phone, idCharge })

        // Generate token
        user = await User.getByID(idUser)

        const userResume = { 
            id: user.id,
            username: user.username,
            charge: user.charge,
            role: user.role
        }

        const newAccessToken = await tokenSign(userResume, tokenSecretKey, '24h')
        const newRefreshToken = await tokenSign(userResume, refreshTokenSecretKey, '30d')

        const data = {
            id: user.id,
            names: user.names,
            surnames: user.surnames,
            username: user.username,
            charge: user.charge,
            role: user.role,
            mail: user.mail,
            phone: user.phone,
            token: newAccessToken,
            refreshToken: newRefreshToken
        }

        const status = 200
        const message = 'User updated successfully'
        handleResponse(response, status, message, data)
    } catch (error) {
        httpError(response, error)
    }
}

const registerCtrl = async (request, response) => {
    try {
        const { names, surnames, username, password, mail, idCharge, idRole } = request.body
        const passwordHash = await encrypt(password)

        User.create({
            names: names,
            surnames: surnames,
            username: username, 
            password: passwordHash,
            mail: mail,
            idCharge: idCharge,
            idRole: idRole
        })
        .then(() => {
            const status = 201
            const message = 'User create successfully'
            handleResponse(response, status, message)
        })
        .catch(error => {
            console.log(
                { 
                    name: error.name,
                    message: error.message,
                    errors: error.errors || []
                }
            )
            const status = 500
            const message = 'An error occurred while trying to create the user'
            handleResponse(response, status, message)
        })
    } catch (error) {
        httpError(response, error)
    }
}

const resetPassword = async(request, response) => {
    try {
        const { mail } = request.body
        const user = await User.getByMail(mail)

        if (!user) {
            const status = 404
            const message = 'User not found'
            handleResponse(response, status, message)
            return
        }

        if (user.isDeleted) {
            const status = 404
            const message = 'User not found'
            handleResponse(response, status, message)
            return
        }

        // Update password
        const password = (Date.now()).toString(32)
        const passwordHash = await encrypt(password)

        console.log({
            password, passwordHash,
        })

        await user.update({ password: passwordHash })
        
        // Send mail
        await sendMail(user.mail, password)

        const status = 200
        const message = 'User password reset. The user will receive their new password by email'
        handleResponse(response, status, message)
    } catch(error) {
        httpError(response, error)
    }
}

export { loginCtrl, registerCtrl, updateCtrl, resetPassword }