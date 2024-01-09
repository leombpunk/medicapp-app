import axios from "axios"
import { RouteAPI } from "../constants/RoutesAPI"
import { getToken } from "../constants/token"

const getAllProfesionalUsers = (search, page, order) => {
    const token = getToken()
    const config = {
        headers: {
            Authorization: token
        }
    }
    const url = `${RouteAPI.Schedule}/?page=${page}&search=${search}&orderColumn=${order.column}&orderDirection=${order.direction}`
    const request = axios.get(url, config)
    return request.then(response => response)
}

const getProfesionalSetting = (idProfesional) => {
    const token = getToken()
    const config = {
        headers: {
            Authorization: token
        }
    }
    const url = `${RouteAPI.Schedule}/config/${idProfesional}`
    const request = axios.get(url, config)
    return request.then(response => response)
}

const updateProfesionalSetting = async (idProfesional, setting) => {
    // console.log(setting)
    const token = getToken()
    const config = {
        headers: {
            Authorization: token
        }
    }
    const url = `${RouteAPI.Schedule}/config/${idProfesional}`
    const request = axios.post(url, setting, config)
    return request.then(response => response)
}

const scheduleServices = { getAllProfesionalUsers, getProfesionalSetting, updateProfesionalSetting }
export default scheduleServices