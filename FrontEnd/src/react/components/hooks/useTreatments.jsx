import { useEffect, useState } from 'react'
import { RoutesNavigation } from '../../constants/RoutesNavigation'
import treatmentServices from '../../services/treatments'
import { useNavigate } from 'react-router-dom'
import { ORDER } from '../../constants/constants'

const useTreatments = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [treatments, setTreatments] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [order, setOrder] = useState({ id: ORDER.Descending })
    const [search, setSearch] = useState('')

    const handleOrder = (row, value) => {
        const newOrder = {}
        newOrder[row] = value
        setOrder(newOrder)
    }

    const handleSearch = (value) => {
        setSearch(value)
        setPage(1)
    }

    const handleOnPress = (treatment) => {
        const URL = `${RoutesNavigation.Treatments}/${treatment.id}`
        navigate(URL)
    }

    const fetchTreatments = async () => {
        try {
            setLoading(true)
            const tableOrder = Object.keys(order).map(key => [key, order[key]])
            const response = await treatmentServices.getAllTreatments(search, page, tableOrder)

            if (response.status === 200) {
                setTotalPages(response.data.total_pages)
                setTreatments(response.data.results)    
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)

        }
    }

    useEffect(() => {
        fetchTreatments()
    }, [search, page, order])

    return {
        loading,
        treatments, 
        totalPages,
        search,
        page,
        order,
        handleSearch,
        handlePage: setPage,
        handleOrder,
        handleOnPress,
    }
}

export default useTreatments