import axios from "axios"
import { RouteAPI } from "../constants/RoutesAPI"
import { getToken } from "../constants/token"

const getAllUsers = async (search, page, order) => {
    const token = getToken()
    const config = {
        headers: {
            Authorization: token
        }
    }
    const url = `${RouteAPI.Users}?page=${page}&search=${search}&orderColumn=${order.column}&orderDirection=${order.direction}`
    const request = axios.get(url, config)
    return request.then(response => response)
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
    const token = getToken()
    const config = {
        headers: {
            Authorization: token
        }
    }
    const url = `${RouteAPI.Users}/username/${username}`
    const request = axios.get(url, config)
    return request.then(response => response)
}

const createUser = async (user) => {
    const token = getToken()
    const config = {
        headers: {
            Authorization: token
        }
    }
    const request = axios.post(RouteAPI.Users, user, config)
    return request.then(response => response)
}

const updateUser = (id, user) => {
    const token = getToken()
    const config = {
        headers: {
            Authorization: token
        }
    }

    const url = `${RouteAPI.Users}/${id}`
    const request = axios.patch(url, user, config)
    return request.then(response => response)
}

const updateUserPut = (id, user) => {
    const token = getToken()
    const config = {
        headers: {
            Authorization: token
        }
    }

    const url = `${RouteAPI.Users}/${id}`
    const request = axios.put(url, user, config)
    return request.then(response => response)
}

const userServices = { getAllUsers, getUser, createUser, updateUser, getUserByUsername, updateUserPut }
export default userServices