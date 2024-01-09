import { useEffect, useState } from 'react'
import { RoutesNavigation } from '../../constants/RoutesNavigation'
import patientServices from '../../services/patients'
import { useNavigate } from 'react-router-dom'
import { ORDER } from '../../constants/constants'

const usePatients = ({ idProfesional, idTreatment }) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [patients, setPatients] = useState([])
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

    const handleOnPress = (patient) => {
        const URL = `${RoutesNavigation.Patients}/${patient.id}`
        navigate(URL)
    }

    const getPatients = async () => {
        try {
            setLoading(true)
            const tableOrder = Object.keys(order).map(key => [key, order[key]])
            const response = await patientServices.getAllPatients({ search, page, order: tableOrder, idProfesional, idTreatment })
            if (response.status === 200) {
                setTotalPages(response.total_pages)
                setPatients(response.data)    
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    
    const addPatient = async (patient) => {
        try {
            const response = await patientServices.createPatient(patient)
            if (response.status === 201) {
                setPage(1)
                setOrder({ id: ORDER.Descending })
            }
            return response
        } catch (error) {
            return error.response
        }
    }

    useEffect(() => {
        getPatients()
    }, [search, page, order, idProfesional, idTreatment])

    return {
        loading,
        patients, 
        totalPages,
        search,
        page,
        order,
        handleSearch,
        handlePage: setPage,
        handleOrder,
        handleOnPress,
        addPatient,
    }
}

export default usePatients