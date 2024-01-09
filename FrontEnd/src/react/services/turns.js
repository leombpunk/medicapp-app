import { RouteAPI } from '../constants/RoutesAPI'
import { getToken } from '../constants/token'

const createTurn = async (turn) => {
    const token = getToken()

    const config = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(turn)
    }
    const URL = RouteAPI.Turns
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const updateTurn = async (id, turn) => {
    const token = getToken()

    const config = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(turn)
    }
    const URL = `${RouteAPI.Turns}/${id}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const deleteTurn = async (id) => {
    const token = getToken()

    const config = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    }
    const URL = `${RouteAPI.Turns}/${id}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const confirmTurn = async (id) => {
    const token = getToken()

    const config = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    }
    const URL = `${RouteAPI.Turns}/${id}/confirm`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const getTurns = async ({ idPatient, idProfesional, idTreatment, page, order, status, startTime, endTime }) => {
    const token = getToken()

    const config = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    const params = new URLSearchParams({
        idPatient: idPatient ?? '',
        idProfesional: idProfesional ?? '',
        idTreatment: idTreatment ?? '',
        status: status ?? '',
        startTime: startTime ?? '',
        endTime: endTime ?? '',
        order: JSON.stringify(order),
        page: page ?? 1,
    })

    const URL = `${RouteAPI.Turns}?${params.toString()}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const turnServices = { createTurn, updateTurn, deleteTurn, confirmTurn, getTurns }

export default turnServices