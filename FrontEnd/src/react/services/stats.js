import { RouteAPI } from "../constants/RoutesAPI"
import { getToken } from "../constants/token"

const getProfesionalPatients = async ({ idProfesional }) => {
    const token = getToken()

    const config = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    const params = new URLSearchParams({
        idProfesional: idProfesional ?? ''
    })

    const URL = `${RouteAPI.Stats}/patients?${params.toString()}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const getProfesionalTreatments = async ({ idProfesional }) => {
    const token = getToken()

    const config = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    const params = new URLSearchParams({
        idProfesional: idProfesional ?? ''
    })

    const URL = `${RouteAPI.Stats}/treatments?${params.toString()}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const getProfesionalEarnings = async ({ idProfesional }) => {
    const token = getToken()

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    }


    const params = new URLSearchParams({
        idProfesional: idProfesional ?? ''
    })
    
    const URL = `${RouteAPI.Stats}/earnings?${params.toString()}`
    const response = await fetch(URL, config)
    const result = await response.json()
    return result
}

const statServices = {
    getProfesionalEarnings,
    getProfesionalPatients,
    getProfesionalTreatments,
}

export default statServices