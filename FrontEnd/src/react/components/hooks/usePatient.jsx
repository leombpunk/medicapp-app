import { useEffect, useState } from 'react'
import patientServices from '../../services/patients'
import { useSidebarContext } from '../providers/SidebarProvider'

const usePatient = (idPatient) => {
    const [loading, setLoading] = useState(false)
    const [patient, setPatient] = useState(null)
    const { handlePatient } = useSidebarContext()
    
    const getPatient = async () => {
        try {
            setLoading(true)
            const response = await patientServices.getPatient(idPatient)
            setPatient(response.data)
            handlePatient(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const editPatient = async (patient) => {
        try {
            const response = await patientServices.updatePatient(patient.id, patient)
            if (response.status === 200) {
                getPatient()
            }
            return response
        } catch(error) {
            return error.data
        }
    }

    const deletePatient = async (patient) => {
        try {
            const response = await patientServices.deletePatient(patient.id, patient)
            return response
        } catch(error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        getPatient()
    }, [idPatient])

    return { loading, patient, editPatient, deletePatient }
}

export default usePatient