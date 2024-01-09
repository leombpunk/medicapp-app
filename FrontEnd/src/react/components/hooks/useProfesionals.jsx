import { useEffect, useState } from 'react'
import { RoutesNavigation } from '../../constants/RoutesNavigation'
import { useNavigate } from 'react-router-dom'
import profesionalServices from '../../services/profesionals'
import { ORDER } from '../../constants/constants'

const useProfesionals = (notpaginated) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [profesionals, setProfesionals] = useState([])
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

    const handleOnPress = (profesional) => {
        const URL = `${RoutesNavigation.Profesionals}/${profesional.id}`
        navigate(URL)
    }

    const getProfesionals = async () => {
        try {
            setLoading(true)
            const tableOrder = Object.keys(order).map(key => [key, order[key]])
            const response = await profesionalServices.getAllProfesionals(search, page, tableOrder, notpaginated)
            
            if (response.status === 200) {
                setTotalPages(response.total_pages)
                setProfesionals(response.data)    
            }
        } catch (error) {
            console.log(error.data)
        } finally {
            setLoading(false)
        }
    }
    /*
    const fetchAllProfesionals = async () => {
        try {
            setLoading(true)
            const response = await profesionalServices.findAllProfesionals()
            setAllProfesionals(response.data)
            setLoading(false)
        } catch (error) {
            const results = error.response
            if (results.status === 401) {
                setAllProfesionals([])
            }
            setLoading(false)
        }
    }
    */
    useEffect(() => {
        getProfesionals()
        //fetchAllProfesionals()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, page, order])

    return {
        loading,
        profesionals, 
        totalPages,
        search,
        page,
        order,
        handleSearch,
        handlePage: setPage,
        handleOrder,
        handleOnPress
    }
}

export default useProfesionals