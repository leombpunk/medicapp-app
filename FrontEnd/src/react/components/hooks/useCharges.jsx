import { useEffect, useState } from "react"
import { ORDER } from "../../constants/constants"
import chargeServices from "../../services/charges"

const useCharges = () => {
    const [loading, setLoading] = useState(false)
    const [charges, setCharges] = useState([])
    const [chargesList, setChargesList] = useState([])
    const [order, setOrder] = useState({ id: ORDER.Descending })
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const handleOrder = (row, value) => {
        const newOrder = {}
        newOrder[row] = value
        setOrder(newOrder)
    }

    const handleSearch = (value) => {
        setSearch(value)
        setPage(1)
    }

    const fetchCharges = async () => {
        try {
            setLoading(true)
            const response = await chargeServices.getAllCharges()
            const result = response.data

            if (result.status === 200) {
                setCharges(result.data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchChargesList = async () => {
        try {
            setLoading(true)
            const tableOrder = Object.keys(order).map(key => [key, order[key]])
            const response = await chargeServices.getAllChargesSearcher(search, page, tableOrder)
            const result = response.data
            if (result.status === 200) {
                setChargesList(result.data.results)
                setTotalPages(result.data.total_pages)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)

        }
    }

    const createCharge = async (charge) => {
        try {
            const response = await chargeServices.createCharge(charge)

            if (response.status === 201) {
                setOrder({ id: ORDER.Descending })
                fetchChargesList()
            }

            return response
        } catch (error) {
            return error.response
        }
    }

    const updateCharge = async (idCharge, data) => {
        try {
            const response = await chargeServices.updateCharge(idCharge, data)
            if (response.status === 200) {
                setOrder({ id: ORDER.Descending })
                fetchChargesList()
            }
            return response
        } catch (error) {
            return error.response
        }
    }

    const deleteCharge = async (idCharge) => {
        try {
            const response = await chargeServices.deleteCharge(idCharge)
            if (response.status === 200) {
                setOrder({ id: ORDER.Descending })
                fetchChargesList()
            }
            return response
        } catch (error) {
            return error.response
        }
    }

    useEffect(() => {
        fetchCharges()
        fetchChargesList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, order, page])

    return { 
        loading, 
        charges,
        chargesList,
        totalPages,
        search,
        page,
        order,
        handleSearch,
        handlePage: setPage,
        handleOrder,
        createCharge,
        updateCharge, 
        deleteCharge 
    }
}

export default useCharges