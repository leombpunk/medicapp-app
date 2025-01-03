import * as dotenv from 'dotenv'
import { getTokenFromRequest } from '../helpers/generateToken.js'
import { httpError } from '../helpers/handleErrors.js'
import { handleResponse, handleResponseCustomStatus } from '../helpers/handleResponse.js'
import Note from '../models/note.js'
import Patient from '../models/patient.js'
import Treatment from '../models/treatment.js'
import Turn from '../models/turn.js'

dotenv.config()

const cloudStorage = process.env.CLOUD_STORAGE === "1" ? "cloud" : "local"

const getPatients = async (request, response) => {
    try {
        const { search, page, idProfesional, order: stringOrder, idTreatment } = request.query
        const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']

        const {total_pages, results } = await Patient.getPage({
            idProfesional: Number(idProfesional),
            idTreatment: Number(idTreatment),
            search: search ?? '',
            order,
            page: page ? Number(page) - 1 : 0
        })

        const status = 200
        const message = ''
        response.send({ status, message, data: results, total_pages })
    } catch (error) {
        httpError(response, error)
    }
}

const getPatientsResume = async (request, response) => {
    try {
        const { idProfesional } = request.query

        const [results] = await Patient.getStats(idProfesional)

        const dataIndexed = results.reduce((accumulator, current) => {
            if (!accumulator[current.year]) {
                accumulator[current.year] = {}
            }
            accumulator[current.year][current.month] = current.patients
            return accumulator
        }, {})
        
        const data = Object.keys(dataIndexed).map(year => {
            let yearTotalPatients = 0
            const patients =  Array.from({ length: 12 }, (_, i) => i + 1).map(month => {
                const monthTotal = dataIndexed[year][month] ?? 0
                yearTotalPatients += monthTotal
                return { month, total: monthTotal }
            })
            return { year: Number(year), patients, total: yearTotalPatients }
        }).sort((a, b) => a.year < b.year ? 1 : -1)

        const status = 200
        const message = ''
        handleResponse(response, status, message, data)
    } catch (error) {
        httpError(response, error)
    }
}

const getPatient = async (request, response) => {
    try {
        const id = request.params.id
        const result = await Patient.getByID(id)
        
        if (result) {
            const status = 200
            const message = ''
            handleResponse(response, status, message, result)
        } else {
            const status = 404
            const message = 'Patient not found'
            handleResponse(response, status, message)
        }
    } catch (error) {
        httpError(response, error)
    }
}

const getPatientByDNI = async (request, response) => {
    try {
        const dni = request.params.dni
        const result = await Patient.getByDNI(dni)
        
        if (result) {
            const status = 200
            const message = ''
            handleResponse(response, status, message, result)
        } else {
            const status = 404
            const message = 'Patient not found'
            handleResponse(response, status, message)
        }
    } catch (error) {
        httpError(response, error)
    }
}

const createPatient = (request, response) => {
    try {
        const { names, surnames, dni, birthdate, phone, address } = request.body
        
        Patient.create({
            names, surnames, dni, birthdate, phone, address
        })
        .then(result => {
            const status = 201
            const message = 'Patient create successfully'
            handleResponse(response, status, message, result)
        })
        .catch(error => {
            const errorNumber = Number(error?.original?.errno)
            if (errorNumber === 1062) {
                console.log(error)
                const httpStatus = 409
                const status = 1062
                const message = `DNI is duplicate`
                handleResponseCustomStatus(response, httpStatus, status, message)
                return
            }
            const status = 500
            const message = `An error occurred while trying to create the patient: ${error.errors}`
            handleResponse(response, status, message)
        })
    } catch (error) {
        httpError(response, error)
    }
}

const updatePatient = async (request, response) => {
    try {
        const { id } = request.params
        const { names, surnames, dni, birthdate, phone, address } = request.body

        const patient = await Patient.findOne({ where: { id } })

        if (!patient) {
            const status = 404
            const message = 'Patient is not found or does not exist'
            handleResponse(response, status, message)
            return
        }

        await patient.update({ names, surnames, dni, birthdate, phone, address })

        const status = 200
        const message = 'Patient updated successfully'
        handleResponse(response, status, message, patient)
    } catch (error) {
        const errorNumber = Number(error?.original?.errno)
        if (errorNumber === 1062) {
            console.log(error)
            const httpStatus = 409
            const status = 1062
            const message = `DNI is duplicate`
            handleResponseCustomStatus(response, httpStatus, status, message)
            return
        }
        httpError(response, error)
    }
}

const deletePatient = async (request, response) => {
    try {
        const { id } = request.params

        const patient = await Patient.findOne({ where: { id } })

        if (!patient) {
            const status = 404
            const message = 'Patient is not found or does not exist'
            handleResponse(response, status, message)
            return
        }

        await patient.destroy()

        const status = 200
        const message = 'Patient deleted successfully'
        handleResponse(response, status, message)
    } catch (error) {
        httpError(response, error)
    }
}

const deleteAllPatients = (request, response) => {
    try {
        Patient.destroy({
            where: {},
            truncate: true
        })
        .then(() => {
            const status = 200
            const message = 'All patients deleted successfully'
            handleResponse(response, status, message)
        })
        .catch(error => {
            console.log(error)
            const status = 500
            const message = 'An error occurred while trying to delete all the patients'
            handleResponse(response, status, message)
        })
    } catch (error) {
        httpError(response, error)
    }
}

const getPatientFiles = async (request, response) => {
    try {
        const idPatient = request.params.id
        const { search, page, orderColumn, orderDirection } = request.query
        const order = orderColumn ? [orderColumn, orderDirection ? orderDirection : 'ASC'] : ['id', 'ASC']
        const result = await Patient.getFilePage(idPatient, search ? search : '', page ? page - 1 : 0, order, cloudStorage)

        const status = 200
        const message = ''
        const { total_pages, results: data } = result
        response.send({ status, message, data, total_pages, page })
    } catch (error) {
        httpError(response, error)
    }
}

const getPatientPhotos = async (request, response) => {
    try {
        const idPatient = request.params.id
        const { search, page, orderColumn, orderDirection } = request.query
        const order = orderColumn ? [orderColumn, orderDirection ? orderDirection : 'ASC'] : ['id', 'ASC']
        const result = await Patient.getPhotoPage(idPatient, search ? search : '', page ? page - 1 : 0, order, cloudStorage)

        const status = 200
        const message = ''
        const { total_pages, results: data } = result
        response.send({ status, message, data, total_pages, page })
    } catch (error) {
        httpError(response, error)
    }
}

const getPatientTurns = async (request, response) => {
    try {
        const { id: idPatient } = request.params
        const {
            idProfesional,
            status,
            rows,
            page,
            startTime, endTime,
            order: stringOrder
        } = request.query

        const order = stringOrder ? JSON.parse(stringOrder) : ['id', 'ASC']
        const { total_pages, results: data } = await Turn.getPage({
            idPatient: idPatient,
            idProfesional: idProfesional ?? undefined,
            rows: Number(rows),
            page: page ? Number(page) - 1 : 0,
            startTime,
            endTime,
            status: status ?? '',
            order,
        })

        response.send({ status: 200, message: '', data, total_pages })
    } catch (error) {
        httpError(response, error)
    }
}

const getPatientTreatments = async (request, response) => {
    try {
        const { id: idPatient } = request.params
        const { status: treatmentStatus, orderColumn, orderDirection } = request.query
        const order = orderColumn ? [orderColumn, orderDirection ? orderDirection : 'ASC'] : ['id', 'ASC']

        const turns = await Turn.findAll({ where: { idPatient }, raw: true })
        const treatmentsOfPatient = turns.map(turn => turn.idTreatment)

        const results = await Treatment.findAll({ 
            where: { id: treatmentsOfPatient },
            order: [ order ],
            include: [ "profesional" ]
        })

        const status = 200
        const message = ''
        handleResponse(response, status, message, results)
    } catch (error) {
        httpError(response, error)
    }
}

const getPatientNotes = async (request, response) => {
    try {
        const { id: idPatient } = request.params
        const { search, page } = request.query
        const result = await Patient.getNotePage(idPatient, search ? search : '', page ? page - 1 : 0, ['id', 'DESC'])

        const status = 200
        const message = ''
        const { total_pages, results: data } = result
        response.send({ status, message, data, total_pages, page })
    } catch (error) {
        httpError(response, error)
    }
}

const createPatientNote = async (request, response) => {
    try {
        const { id: idPatient } = request.params
        const { content } = request.body
        const accessToken = await getTokenFromRequest(request)
        const createdBy = accessToken.id
        
        Note.create({ idPatient, content, createdBy })
        .then(result => {
            const status = 201
            const message = 'Note create successfully'
            handleResponse(response, status, message, result)
        })
        .catch(error => {
            console.log(error)
            const status = 500
            const message = `An error occurred while trying to create the note: ${error.errors}`
            handleResponse(response, status, message)
        })
    } catch (error) {
        httpError(response, error)
    }
}

const updatePatientNote = async (request, response) => {
    try {
        const { id: idPatient, note: idNote } = request.params
        const { content } = request.body
        const accessToken = await getTokenFromRequest(request)
        const modifiedBy = accessToken.id
        
        const note = await Note.findOne({ where: { idPatient, id: idNote } })

        if (!note) {
            const status = 404
            const message = 'Note is not found or does not exist'
            handleResponse(response, status, message)
            return
        }

        await note.update({ content, modifiedBy })

        const status = 200
        const message = 'Note updated successfully'
        handleResponse(response, status, message, note)
    } catch (error) {
        httpError(response, error)
    }
}

const deletePatientNote = async (request, response) => {
    try {
        const { id: idPatient, note: idNote } = request.params

        const note = await Note.findOne({ where: { idPatient, id: idNote } })

        if (!note) {
            const status = 404
            const message = 'Note is not found or does not exist'
            handleResponse(response, status, message)
            return
        }

        await note.destroy()

        const status = 200
        const message = 'Note deleted successfully'
        handleResponse(response, status, message)
    } catch (error) {
        httpError(response, error)
    }
}


export {
    getPatients,
    getPatientsResume,
    getPatient,
    getPatientByDNI,
    createPatient,
    updatePatient,
    deletePatient,
    deleteAllPatients,
    getPatientFiles,
    getPatientPhotos,
    getPatientTurns,
    getPatientTreatments,
    getPatientNotes,
    createPatientNote,
    updatePatientNote,
    deletePatientNote,
}