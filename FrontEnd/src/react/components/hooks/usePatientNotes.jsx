import { useEffect, useState } from 'react'
import patientServices from '../../services/patients'

const usePatientNotes = (idPatient) => {
    const [loading, setLoading] = useState(false)
    const [notes, setNotes] = useState([])

    const getNotes = async () => {
        try {
            setLoading(true)
            const response = await patientServices.getPatientNotes(idPatient, 1)

            if (response.status === 200) {
                setNotes(response.data)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const createNote = async (data) => {
        try {
            const response = await patientServices.createPatientNote(idPatient, data)

            if (response.status === 201) {
                getNotes()
            }

            return response
        } catch (error) {
            console.log(error)
        }
    }

    const editNote = async (idNote, data) => {
        try {
            const response = await patientServices.updatePatientNote(idPatient, idNote, data)

            if (response.status === 200) {
                getNotes()
            }

            return response
        } catch (error) {
            console.log(error)
        }
    }

    const deleteNote = async (idNote) => {
        try {
            const response = await patientServices.deletePatientNote(idPatient, idNote)

            if (response.status === 200) {
                getNotes()
            }

            return response
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getNotes()
    }, [])

    return {
        loading,
        notes,
        getNotes,
        createNote,
        editNote,
        deleteNote
    }
}

export default usePatientNotes