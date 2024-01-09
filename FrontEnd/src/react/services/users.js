import axios from "axios"
import { RouteAPI } from "../constants/RoutesAPI"
import { getToken } from "../constants/token"

const getAllUsers = async (search, page, order) => {
    const token = getToken()

    const config = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    }

    const params = new URLSearchParams({
        search: search ?? '',
        page: page ?? 1,
        order: JSON.stringify(order)
    })

    const URL = `${RouteAPI.Users}?${params.toString()}`

    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const getUser = async (id) => {
    const token = getToken()
    const config = {
        headers: {
            Authorization: token
        }
    }
    const url = `${RouteAPI.Users}/${id}`
    const request = axios.get(url, config)
    return request.then(response => response)
}

const getUserByUsername = async (username) => {
    /*
    const token = getToken()
    const config = {
        headers: {
            Authorization: token
        }
    }
    const url = `${RouteAPI.Users}/username/${username}`
    const request = axios.get(url, config)
    return request.then(response => response)
    */
    const token = getToken()

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    const URL = `${RouteAPI.Users}/username/${username}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const getUserByMail = async (mail) => {
    const token = getToken()

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    const URL = `${RouteAPI.Users}/mail/${mail}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const createUser = async (data) => {
    /*
    const token = getToken()
    const config = {
        headers: {
            Authorization: token
        }
    }
    const request = axios.post(RouteAPI.Users, user, config)
    return request.then(response => response)
    */
    const token = getToken()

    const config = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const URL = RouteAPI.Users
    const response = await fetch(URL, config)
    const result = await response.json()
    return result
}

const updateUser = async (id, user) => {
    /*
    const token = getToken()
    const config = {
        headers: {
            Authorization: token
        }
    }

    const url = `${RouteAPI.Users}/${id}`
    const request = axios.patch(url, user, config)
    return request.then(response => response)
    */
    const token = getToken()

    const config = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }

    const URL = `${RouteAPI.Users}/${id}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const updateUserPut = async (id, user) => {
    const token = getToken()
    const config = {
        headers: {
            Authorization: token
        }
    }

    const url = `${RouteAPI.Users}/${id}`
    const request = axios.put(url, user, config)
    return request.then(response => response)
    /*
    const token = getToken()

    const config = {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }

    const URL = `${RouteAPI.Users}/${id}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
    */
}

const updateUserPass = async (idUser, data) => {
    /*
    const token = getToken()
    const config = {
        headers: {
            Authorization: token
        }
    }

    const url = `${RouteAPI.Users}/updatePass`
    const request = axios.patch(url, data, config)
    return request.then(response => response)
    */
    const token = getToken()

    const config = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const URL =`${RouteAPI.Users}/${idUser}/updatePass`
    const response = await fetch(URL, config)
    const result = await response.json()
    return result
}

const deleteUser = async (idUser) => {
    const token = getToken()

    const config = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    const URL =`${RouteAPI.Users}/${idUser}`
    const response = await fetch(URL, config)
    const result = await response.json()
    return result
}

const activateUser = async (idUser) => {
    const token = getToken()

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    const URL =`${RouteAPI.Users}/${idUser}/activate`
    const response = await fetch(URL, config)
    const result = await response.json()
    return result
}

const userServices = { getAllUsers, getUser, createUser, updateUser, getUserByUsername, getUserByMail, updateUserPut, updateUserPass, deleteUser, activateUser }
export default userServices