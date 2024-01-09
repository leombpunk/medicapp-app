import axios from "axios"
import { RouteAPI } from "../constants/RoutesAPI"
import { getToken } from "../constants/token"

const getAllPatients = async ({ search, page, order, idProfesional, idTreatment }) => {
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
        idProfesional: idProfesional ?? '',
        idTreatment: idTreatment ?? '',
        order: JSON.stringify(order ?? []),
    })

    const URL = `${RouteAPI.Patients}?${params.toString()}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const getPatientsOfProfesional = async (idProfesional) => {
    const token = getToken()

    const config = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    const URL = `${RouteAPI.Profesionals}/${idProfesional}/patients`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const getPatient = async (id) => {
    const token = getToken()

    const config = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    const URL = `${RouteAPI.Patients}/${id}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const getPatientByDNI = async (dni) => {
    /*
    const token = getToken()
    
    const config = {
        headers: {
            Authorization: token
        }
    }
    
    const url = `${RouteAPI.Patients}/dni/${dni}`
    const response = await axios.get(url, config)
    const data = await response.json()
    return data
    */

    const token = getToken()
    
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const URL =  `${RouteAPI.Patients}/dni/${dni}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const createPatient = async (data) => {
    const token = getToken()

    const config = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const URL = RouteAPI.Patients
    const response = await fetch(URL, config)
    const result = await response.json()
    return result
}

const updatePatient = async (idPatient, data) => {
    const token = getToken()

    const config = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const URL = `${RouteAPI.Patients}/${idPatient}`
    const response = await fetch(URL, config)
    const result = await response.json()
    return result
}

const deletePatient = async (idPatient) => {
    const token = getToken()

    const config = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    const URL = `${RouteAPI.Patients}/${idPatient}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const getPatientFiles = async (id, search, page, order) => {
    const token = getToken()

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    }

    const URL = `${RouteAPI.Patients}/${id}/files?page=${page}&search=${search}&orderColumn=${order.column}&orderDirection=${order.direction}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const getPatientPhotos = async (id, search, page, order) => {
    const token = getToken()

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    }

    const URL = `${RouteAPI.Patients}/${id}/photos?page=${page}&search=${search}&orderColumn=${order.column}&orderDirection=${order.direction}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const getPatientTurns = async ({ idPatient, idProfesional, page, order, rows, status, startTime, endTime }) => {
    const token = getToken()

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const params = new URLSearchParams({
        rows: rows ?? '',
        status: status ?? '',
        page: page ?? 1,
        idProfesional: idProfesional ?? '',
        order: JSON.stringify(order),
        startTime: startTime ?? '',
        endTime: endTime ?? ''
    })

    const URL = `${RouteAPI.Patients}/${idPatient}/turns?${params.toString()}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const getPatientTreatments = async (id, page, order) => {
    const token = getToken()

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const URL = `${RouteAPI.Patients}/${id}/treatments?page=${page}&orderColumn=${order.column}&orderDirection=${order.direction}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const getPatientNotes = async (idPatient, page, order) => {
    const token = getToken()

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    }

    const params = new URLSearchParams({
        page: page ?? 1,
        order: JSON.stringify(order ?? []),
    })

    const URL = `${RouteAPI.Patients}/${idPatient}/notes?${params.toString()}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const createPatientNote = async (idPatient, data) => {
    const token = getToken()

    const config = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const URL = `${RouteAPI.Patients}/${idPatient}/notes`
    const response = await fetch(URL, config)
    const result = await response.json()
    return result
}

const updatePatientNote = async (idPatient, idNote, data) => {
    const token = getToken()

    const config = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const URL = `${RouteAPI.Patients}/${idPatient}/notes/${idNote}`
    const response = await fetch(URL, config)
    const result = await response.json()
    return result
}

const deletePatientNote = async (idPatient, idNote) => {
    const token = getToken()

    const config = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    }

    const URL = `${RouteAPI.Patients}/${idPatient}/notes/${idNote}`
    const response = await fetch(URL, config)
    const result = await response.json()
    return result
}

const patientServices = {
    getAllPatients,
    getPatientsOfProfesional,
    getPatient,
    getPatientByDNI,
    createPatient,
    updatePatient,
    deletePatient,
    getPatientFiles,
    getPatientPhotos,
    getPatientTurns,
    getPatientTreatments,
    getPatientNotes,
    createPatientNote,
    updatePatientNote,
    deletePatientNote
}

export default patientServices