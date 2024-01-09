import { verifyToken } from '../helpers/generateToken.js'

const checkCoherence = async (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token, process.env.JWT_SECRET)
        const data = request.body
        // console.log(tokenData)
        if (tokenData.id === data.id) {
            next()
        } else {
            response.status(401)
            response.send({ error: 'You do not have permissions to perform this operation' })
        }
    } catch (error) {
        console.log('/* checkCoherence middleware */')
        console.log(error)
        response.status(401)
        response.send({ error: 'You do not have permissions to perform this operation' })
    }
}

export { checkCoherence }