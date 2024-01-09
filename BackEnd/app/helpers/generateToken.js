import jwt from 'jsonwebtoken'

const tokenSign = async (user, secretKey, expirationTime) => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role
        },
        secretKey,
        {
            expiresIn: expirationTime,
        }
    )
}

const verifyToken = async (token, secretKey) => {
    try {
        //return jwt.verify(token, process.env.JWT_SECRET)
        return jwt.verify(token, secretKey)
    } catch(error) {
        return null
    }
}

const getTokenFromRequest = async (request) => {
    const secretKey = process.env.JWT_SECRET
    const token = request.headers.authorization.split(' ').pop()
    const tokenData = await verifyToken(token, secretKey)
    return tokenData
}

const decodeSign = async (token) => {

}

export { tokenSign, verifyToken, decodeSign, getTokenFromRequest }