import { RouteAPI } from '../constants/RoutesAPI'
import { getToken } from '../constants/token'

const createException = async (exception) => {
    const token = getToken()

    const config = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exception)
    }
    const URL = RouteAPI.Exceptions
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const updateException = async (id, exception) => {
    const token = getToken()

    const config = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exception)
    }
    const URL = `${RouteAPI.Exceptions}/${id}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const deleteException = async (id) => {
    const token = getToken()

    const config = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    }
    const URL = `${RouteAPI.Exceptions}/${id}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const exceptionServices = { createException, updateException, deleteException }

export default exceptionServices