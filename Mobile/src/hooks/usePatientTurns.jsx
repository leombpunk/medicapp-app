import { useUserContext } from '../providers/UserProvider.jsx'
import { useEffect, useState } from 'react'
import turnServices from '../services/turns.js'

const usePatientTurns = (idPatient) => {
    const [isLoading, setIsLoading] = useState(false)
    const [turns, setTurns] = useState([])
    const [page, setPage] = useState(1)
    const { getUserToken } = useUserContext()
    
    const getTurns = async () => {
        try {
            setIsLoading(true)
            const userToken = getUserToken()
            const response = await turnServices.getAllTurns(userToken, idPatient, page)
            if (response.status === 200) {
                setTurns(response.data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getTurns()
    }, [idPatient, page])

    return {
        isLoading,
        turns
    }
}

export default usePatientTurns