import { RouteAPI } from '../constants/RoutesAPI'

const getAllProfesionals = async (userToken, page, search) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-type': 'application/json'
        }
    }

    const params = new URLSearchParams({
        search: search ?? '',
        page: page ?? 1
    })

    const url = `${RouteAPI.Profesionals}?${params.toString()}`
    const response = await fetch(url, config)
    const result = await response.json()
    return result
}

const getProfesional = async (userToken, idProfesional) => {
    const url = `${RouteAPI.Profesionals}/${idProfesional}`
    const config = {
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-type': 'application/json'
        },
    }
    const response = await fetch(url, config)
    const result = await response.json()
    return result
}

const getProfesionalEvents = async (userToken, idProfesional, startTime) => {
    const url = `${RouteAPI.Profesionals}/${idProfesional}/events?startTime=${startTime}`
    const config = {
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-type': 'application/json'
        },
    }
    const response = await fetch(url, config)
    const result = await response.json()
    return result
}

const profesionalServices = { getAllProfesionals, getProfesional, getProfesionalEvents }

export default profesionalServices