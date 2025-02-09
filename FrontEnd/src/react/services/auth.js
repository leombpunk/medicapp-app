import axios from 'axios'
import { getToken } from '../constants/token'
// const baseURL = 'http://localhost:3001'
const baseURL = 'https://medicapp-app-api.vercel.app'
const authURL = `${baseURL}/auth`

const login = (credentials) => {
    const url = `${authURL}/login`
    const request = axios.post(url, credentials)
    return request
}

const register = (user) => {
    const url = `${authURL}/register`
    const request = axios.post(url, user)
    return request
}

const update = async (data) => {
    const token = getToken()

    const config = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const URL = `${authURL}/update`
    const response = await fetch(URL, config)
    const result = await response.json()
    return result
}

const resetPassword = async (data) => {
    const token = getToken()

    const config = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const URL = `${authURL}/resetpassword`
    const response = await fetch(URL, config)
    const result = await response.json()
    return result
}

const userServices = { login, register, update, resetPassword }

export default userServices