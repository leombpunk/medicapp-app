import { useEffect, useState } from 'react'
import { useUserContext } from '../providers/UserProvider'
import { getStringDateInTimeZone } from '../constants/timeFunctions'
import { useSettingsContext } from '../providers/SettingsProvider'
import { UTC } from '../constants/time'
import profesionalServices from '../services/profesionals'

const useProfesionalEvents = (idProfesional, date) => {
    const [isLoading, setIsLoading] = useState(false)
    const [events, setEvents] = useState([])
    const { timeZone } = useSettingsContext()
    const { getUserToken } = useUserContext()

    const getProfesionalEvents = async () => {
        try {
            setIsLoading(true)
            setEvents([])
            const userToken = getUserToken()
            const day = getStringDateInTimeZone(date, UTC)
            const startTime = new Date(`${day}T00:00:00${timeZone.numeric}`)
            const response = await profesionalServices.getProfesionalEvents(userToken, idProfesional, startTime)
            
            if (response.status === 200) {
                setEvents(response.data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getProfesionalEvents()
    }, [idProfesional, date])

    return {
        isLoading,
        events
    }
}

export default useProfesionalEvents