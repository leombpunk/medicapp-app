import { useEffect, useState } from 'react'
import { ORDER } from '../../constants/constants'
import turnServices from '../../services/turns'

const usePatientTurns = ({ idPatient, idProfesional, idTreatment, rows, rowOrder, status, startTime, endTime }) => {
    const [loading, setLoading] = useState(false)
    const [turns, setTurns] = useState([])
    const [order, setOrder] = useState(rowOrder || { dateTime: ORDER.Descending })
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(undefined)
    
    const handleOrder = (row, value) => {
        const newOrder = { ...order }
        newOrder[row] = value
        setOrder(newOrder)
    }

    const getPatientTurns = async () => {
        try {
            setLoading(true)
            const tableOrder = Object.keys(order).map(key => [key, order[key]])
            const response = await turnServices.getTurns({ idPatient, idProfesional, idTreatment, page, order: tableOrder, rows, status, startTime, endTime })
            if (response.status === 200) {
                setTurns([...turns, ...response.data])
                setTotalPages(response.total_pages)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handlePage = () => {
        if (loading) {
            return
        }
        setPage(p => p + 1)
    }

    useEffect(() => {
        getPatientTurns()
    }, [idPatient, idProfesional, idTreatment, page, order, status, startTime, endTime])

    const resetList = () => {
        setTurns([])
    }

    return {
        loading,
        turns,
        order,
        handleOrder,
        page,
        totalPages,
        handlePage,
        handleReset: resetList,
    }
}

export default usePatientTurns