import { useUserContext } from '../providers/UserProvider.jsx'
import { useEffect, useState } from 'react'
import patientServices from '../services/patients.js'

const usePatient = (idPatient) => {
    const { getUserToken } = useUserContext()
    const [isLoading, setIsLoading] = useState(false)
    const [patient, setPatient] = useState(undefined)
    const [photos, setPhotos] = useState([])
    const [photosOrder, setPhotoOrder] = useState({ column: 'id', direction: 'DESC' })
    
    const getPatient = async () => {
        try {
            setIsLoading(true)
            const userToken = getUserToken()
            const response = await patientServices.getPatient(userToken, idPatient)
            if (response.status === 200) {
                setPatient(response.data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const getPatientPhotos = async () => {
        try {
            setIsLoading(true)
            const userToken = getUserToken()
            const response = await patientServices.getPatientPhotos(userToken, idPatient, '', 1, photosOrder)
            if (response.status === 200) {
                setPhotos(response.data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getPatient()
    }, [idPatient])

    useEffect(() => {
        getPatientPhotos()
    }, [idPatient, photosOrder])

    return { isLoading, patient, photos }
}

export default usePatient