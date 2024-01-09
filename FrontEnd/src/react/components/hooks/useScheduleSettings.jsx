import { useEffect, useState } from "react"
import scheduleServices from '../../services/schedule'
import { RoutesNavigation } from "../../constants/RoutesNavigation"
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"

const findEnabledWorkday = (data) => {
    // console.log(data)
    return data.worktimes.length
    // let index = data.workdays.findIndex(workday => {
    //     return workday.enabled === 1
        // console.log(workday.enabled)
    // })
    // console.log(algo)
    // return index
}

//configuracion de la agenda de todos los profesionales
const useScheduleSettings = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [order, setOrder] = useState({column: "id", direction: "DESC"})
    const [search, setSearch] = useState("")
    const [settings, setSettings] = useState("")

    const handleSearch = (value) => {
        setSearch(value)
        setPage(1)
    }

    const handleOnPress = (profesional) => {
        const URL = `${RoutesNavigation.ScheduleSettings}/${profesional.id}`
        navigate(URL)
    }

    const fectchSettings = async (search, page, order) => {
        try {
            setLoading(true)
            const response = await scheduleServices.getAllProfesionalUsers(search, page, order)
            setTotalPages(response.data.total_pages)
            setSettings(response.data.results.map(
                setting => {
                    // findEnabledWorkday(setting)
                    return {
                        ...setting,
                        boolWorkdays: /*setting.workdays.length*/findEnabledWorkday(setting) ? <CheckCircleIcon style={{width: '1.5rem', height:'1.5rem', color:'green'}}/> : <XCircleIcon style={{width: '1.5rem', height:'1.5rem',color:'red'}}/> //aunque no se para que hacer esto
                    }
                }
            ))
            // findEnabledWorkday(response.data.results)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fectchSettings(search, page, order)
    },[search, page, order])

    return {
        loading,
        settings, 
        totalPages,
        search,
        page,
        order,
        handleSearch,
        handlePage: setPage,
        handleOrder: setOrder,
        handleOnPress
    }
}

export default useScheduleSettings