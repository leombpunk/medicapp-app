import { useUserContext } from '../providers/UserProvider.jsx'
import { useEffect, useState } from 'react'
import patientServices from '../services/patients.js'

const usePatientNotes = (idPatient) => {
    const [isLoading, setIsLoading] = useState(false)
    const [notes, setNotes] = useState([])
    const [page, setPage] = useState(1)
    const { getUserToken } = useUserContext()
    
    const getNotes = async () => {
        try {
            setIsLoading(true)
            const userToken = getUserToken()
            const response = await patientServices.getPatientNotes(userToken, idPatient)
            if (response.status === 200) {
                setNotes(response.data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getNotes()
    }, [idPatient])

    useEffect(() => {
        getNotes()
    }, [idPatient])

    return { isLoading, notes }
}

export default usePatientNotes