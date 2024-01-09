import { RouteAPI } from '../constants/RoutesAPI'

const getAllPatients = async (userToken, idProfesional, idTreatment, page, search) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-type': 'application/json'
        }
    }

    const params = new URLSearchParams({
        search: search ?? '',
        page: page ?? 1,
        idProfesional: idProfesional ?? '',
        idTreatment: idTreatment ?? '',
    })

    const url = `${RouteAPI.Patients}?${params.toString()}`
    const response = await fetch(url, config)
    const result = await response.json()
    return result
}

const getPatient = async (userToken, idPatient) => {
    const url = `${RouteAPI.Patients}/${idPatient}`
    const config = {
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-type': 'application/json'
        }
    }
    const response = await fetch(url, config)
    const result = await response.json()
    return result
}

const getPatientPhotos = async (userToken, idPatient, page) => {
    const url = `${RouteAPI.Patients}/${idPatient}/photos?page=${page}`
    const config = {
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-type': 'application/json'
        }
    }
    const response = await fetch(url, config)
    const result = await response.json()
    return result
}

const getPatientNotes = async (userToken, idPatient) => {
    const url = `${RouteAPI.Patients}/${idPatient}/notes`
    const config = {
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-type': 'application/json'
        }
    }
    const response = await fetch(url, config)
    const result = await response.json()
    return result
}

const patientServices = { getAllPatients, getPatient, getPatientPhotos, getPatientNotes }

export default patientServices