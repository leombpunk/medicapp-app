import { useEffect, useState } from 'react'
import { ORDER } from '../../constants/constants'
import reminderServices from '../../services/reminders'

const useReminders = () => {
    const [loaging, setLoading] = useState(false)
    const [order, setOrder] = useState({ dateTime: ORDER.Ascending })
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(undefined)
    const [reminders, setReminders] = useState([])
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()

    const handleOrder = (row, value) => {
        const newOrder = {}
        newOrder[row] = value
        setOrder(newOrder)
    }

    const getReminders = async () => {
        try {
            setLoading(true)
            const tableOrder = Object.keys(order).map((key) => [ key, order[key],])
            const response = await reminderServices.getAllReminders({ startTime, endTime, page, order: tableOrder})
            if (response.status === 200) {
                setTotalPages(response.total_pages)
                setReminders(response.data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getReminders()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startTime, endTime, page, order])

    return {
        loaging,
        reminders,
        order,
        page,
        totalPages,
        handlePage: setPage,
        handleOrder,
        handleStart: setStartTime,
        handleEnd: setEndTime
    }
}

export default useReminders
