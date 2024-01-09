import { RouteAPI } from '../constants/RoutesAPI'

const login = async (credentials) => {
    const url = RouteAPI.Login
    const config = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }
    const response = await fetch(url, config)
    const data = await response.json()
    return data
}

const register = async (user) => {
    const url = RouteAPI.Register
    const config = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    }
    const response = await fetch(url, config)
    const data = await response.json()
    return data
}

const authServices = { login, register }

export default authServices