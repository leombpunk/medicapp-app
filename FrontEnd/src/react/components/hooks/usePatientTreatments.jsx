import { useEffect, useState } from 'react'
import patientServices from '../../services/patients'

const usePatientTreatments = (idPatient) => {
    const [loading, setLoading] = useState(false)
    const [treatments, setTreatments] = useState([])
    const [order, setOrder] = useState({ column: 'id', direction: 'DESC' })

    const getPatientTreatments = async () => {
        try {
            setLoading(true)
            const response = await patientServices.getPatientTreatments(idPatient, 1, order)
            if (response.status === 200) {
                setTreatments(response.data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPatientTreatments()
    }, [idPatient])

    return { loading, treatments }
}

export default usePatientTreatments