import { useEffect, useState } from 'react'
import { useUserContext } from '../providers/UserProvider'
import profesionalServices from '../services/profesionals'

const useProfesionals = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [profesionals, setProfesionals] = useState([])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const { getUserToken } = useUserContext()

    const getProfesionals = async () => {        
        try {
            setIsLoading(true)
            const userToken = getUserToken()
            const response = await profesionalServices.getAllProfesionals(userToken, page, search)
            if (response.status === 200) {
                setProfesionals(response.data)
            }
        } catch (error) {
            console.log(error)
            const results = error.response
            if (results.status === 401) {
                setProfesionals([])
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleReset = () => {
        setProfesionals([])
    }

    useEffect(() => {
        getProfesionals()
    }, [search])

    return {
        isLoading,
        profesionals,
        handleSearch: setSearch,
        handleReset,
    }
}

export default useProfesionals