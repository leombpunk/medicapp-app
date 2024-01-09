import { useEffect, useState } from 'react'
import profesionalServices from '../../services/profesionals'
import { ORDER } from '../../constants/constants'

const useProfesionalTreatments = (idProfesional) => {
    const [loading, setLoading] = useState(false)
    const [treatments, setTreatments] = useState([])
    const [order, setOrder] = useState({ id: ORDER.Descending })
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const handleOrder = (row, value) => {
        const newOrder = {}
        newOrder[row] = value
        setOrder(newOrder)
    }

    const getProfesionalTreatments = async () => {
        try {
            setLoading(true)
            const tableOrder = Object.keys(order).map(key => [key, order[key]])
            const response = await profesionalServices.getProfesionalTreatments({ idProfesional, page, order: tableOrder, search })

            if (response.status === 200) {
                setTreatments(response.data)
                setTotalPages(response.total_pages)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProfesionalTreatments()
    }, [idProfesional, order, search])

    const createTreatment = async (data) => {
        try {
            const response = await profesionalServices.createTreatment(idProfesional, data)

            if (response.status === 201) {
                getProfesionalTreatments()
            }
    
            return response
        } catch(error) {
            return error.response
        }
    }

    const editTreatment = async (id, data) => {
        try {
            const response = await profesionalServices.updateTreatment(idProfesional, id, data)

            if (response.status === 200) {
                getProfesionalTreatments()
            }
    
            return response
        } catch(error) {
            return error.response
        }
    }

    const deleteTreatment = async (id) => {
        try {
            const response = await profesionalServices.deleteTreatment(idProfesional, id)

            if (response.status === 200) {
                getProfesionalTreatments()
            }
    
            return response
        } catch(error) {
            return error.response
        }
    }

    return {
        loading,
        treatments,
        order,
        handleOrder,
        search,
        handleSearch: setSearch,
        page,
        handlePage: setPage,
        totalPages,
        createTreatment,
        editTreatment,
        deleteTreatment
    }
}

export default useProfesionalTreatments