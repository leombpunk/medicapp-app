import { useEffect, useState } from 'react'
import { RoutesNavigation } from '../../constants/RoutesNavigation'
import userServices from '../../services/users'
import { useNavigate } from 'react-router-dom'
import { ORDER } from '../../constants/constants'

const useUsers = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
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

    const handleOnPress = (user) => {
        const URL = `${RoutesNavigation.Users}/${user.id}`
        navigate(URL)
    }

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const tableOrder = Object.keys(order).map(key => [key, order[key]])
            const response = await userServices.getAllUsers(search, page, tableOrder)
            
            if (response.status === 200) {
                setTotalPages(response.data.total_pages)
                setUsers(response.data.results)
            }
        } catch (error) {
            console.log({ error })
        } finally {
            setLoading(false)
        }
    }

    const addUser = async (user) => {
        try {
            console.log(user)
            const response = await userServices.createUser(user)
            if (response.status === 201) {
                setPage(1)
                setOrder({ id: ORDER.Descending })
            }
            return response
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [search, page, order])

    return {
        loading,
        users, 
        totalPages,
        search,
        page,
        order,
        handleSearch,
        handlePage: setPage,
        handleOrder,
        addUser,
        handleOnPress
    }
}

export default useUsers