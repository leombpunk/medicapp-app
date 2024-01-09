import { useEffect, useState } from 'react'
import { useUserContext } from '../providers/UserProvider'
import patientServices from '../services/patients'

const usePatients = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [patients, setPatients] = useState([])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const { getUserToken } = useUserContext()

    const getPatients = async () => {        
        try {
            setIsLoading(true)
            const userToken = getUserToken()
            const response = await patientServices.getAllPatients(userToken, '', '', page, search)
            if (response.status === 200) {
                setPatients(response.data)
            }
        } catch (error) {
            console.log(error)
            const results = error.response
            if (results.status === 401) {
                setPatients([])
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleReset = () => {
        setPatients([])
    }

    useEffect(() => {
        getPatients()
    }, [search])

    return {
        isLoading,
        patients,
        handleSearch: setSearch,
        handleReset
    }
}

export default usePatients