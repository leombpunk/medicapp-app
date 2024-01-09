import { RouteAPI } from '../constants/RoutesAPI'
import { getToken } from '../constants/token'
/*
const findAllProfesionals = async () => {
    const token = getToken()

    const config = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    const request = await fetch(`${RouteAPI.Profesionals}/all`, config)
    const data = await request.json()
    return data
}
*/
const getAllProfesionals = async (search, page, order, notpaginated) => {
    const token = getToken()

    const config = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    const params = new URLSearchParams({
        search: search ?? '',
        page: page ?? 1,
        order: JSON.stringify(order),
        notpaginated: notpaginated ?? false
    })

    const URL = `${RouteAPI.Profesionals}?${params.toString()}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const getProfesional = async (id) => {
    const token = getToken()

    const config = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    const URL = `${RouteAPI.Profesionals}/${id}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const getProfesionalEvents = async (id, startTime) => {
    const token = getToken()

    const config = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    const URL = `${RouteAPI.Profesionals}/${id}/events?startTime=${startTime}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const saveProfesionalScheduleConfig = async (id, worktimes) => {
    const token = getToken()

    const config = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ worktimes })
    }

    const URL = `${RouteAPI.Profesionals}/${id}/config`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const getProfesionalTreatments = async ({ idProfesional, page, order, search }) => {
    const token = getToken()

    const config = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    const params = new URLSearchParams({
        search: search ?? '',
        page: page ?? 1,
        order: JSON.stringify(order)
    })

    const URL = `${RouteAPI.Profesionals}/${idProfesional}/treatments?${params.toString()}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const getTreatment = async (idProfesional, idTreatment) => {
    const token = getToken()

    const config = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }
    
    const URL = `${RouteAPI.Profesionals}/${idProfesional}/treatments/${idTreatment}`
    const response = await fetch(URL, config)
    const result = await response.json()
    return result
}

const createTreatment = async (idProfesional, data) => {
    const token = getToken()

    const config = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const URL = `${RouteAPI.Profesionals}/${idProfesional}/treatments`
    const response = await fetch(URL, config)
    const result = await response.json()
    return result
}

const updateTreatment = async (idProfesional, idTreatment, data) => {
    const token = getToken()

    const config = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    
    const URL = `${RouteAPI.Profesionals}/${idProfesional}/treatments/${idTreatment}`
    const response = await fetch(URL, config)
    const result = await response.json()
    return result
}

const deleteTreatment = async (idProfesional, idTreatment) => {
    const token = getToken()

    const config = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    }
    
    const URL = `${RouteAPI.Profesionals}/${idProfesional}/treatments/${idTreatment}`
    const response = await fetch(URL, config)
    const result = await response.json()
    return result
}

const getProfesionalEarnings = async (idProfesional) => {
    const token = getToken()

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    }
    
    const URL = `${RouteAPI.Profesionals}/${idProfesional}/earnings`
    const response = await fetch(URL, config)
    const result = await response.json()
    return result
}

const profesionalServices = {
    //findAllProfesionals,
    getAllProfesionals,
    getProfesional,
    getProfesionalEvents,
    saveProfesionalScheduleConfig,
    getProfesionalTreatments,
    getTreatment,
    createTreatment,
    updateTreatment,
    deleteTreatment,
    getProfesionalEarnings
}

export default profesionalServices