import { useEffect, useState } from 'react'
import profesionalServices from '../../services/profesionals'

const useProfesionalTreatment = (idProfesional, idTreatment) => {
    const [loading, setLoading] = useState(false)
    const [treatment, setTreatment] = useState(undefined)
    
    const getPatient = async () => {
        try {
            setLoading(true)
            const response = await profesionalServices.getTreatment(idProfesional, idTreatment)
            setTreatment(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPatient()
    }, [idProfesional, idTreatment])

    return { loading, treatment }
}

export default useProfesionalTreatment