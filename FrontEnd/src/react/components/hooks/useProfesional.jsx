import { useEffect, useState } from "react"
import profesionalServices from "../../services/profesionals"
import { useSidebarContext } from "../providers/SidebarProvider"
import { useNavigate } from "react-router-dom"
import { RoutesNavigation } from "../../constants/RoutesNavigation"
import { useNotificationsContext } from "../providers/NotificationsProvider"

const useProfesional = (idProfesional) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [profesional, setProfesional] = useState(null)
    const { handleSchedule } = useSidebarContext()
    const { addNotification } = useNotificationsContext()

    const getProfesional = async () => {
        try {
            setLoading(true)
            const response = await profesionalServices.getProfesional(idProfesional)
            setProfesional(response.data)
            handleSchedule(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const goToProfesionalSchedule = () => {
        const URL = `${RoutesNavigation.Profesionals}/${idProfesional}/schedule`
        navigate(URL)
    }

    const goToProfesionalStats = () => {
        const URL = `${RoutesNavigation.Profesionals}/${idProfesional}/stats`
        navigate(URL)
    }

    const updateWorktimes = (worktimes) => {
        setProfesional(profesional => ({...profesional, worktimes}))
    }

    const saveScheduleConfig = async () => {
        try {
            const worktimes = profesional.worktimes
            const response = await profesionalServices.saveProfesionalScheduleConfig(idProfesional, worktimes)

            if (response.status === 401) {
                addNotification('No tiene permisos para realizar esta operación.', 'danger')
            }

            if (response.status === 200) {
                addNotification('Nueva configuración de agenda guardada exitosamente.', 'success')
                getProfesional()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfesional()
    }, [idProfesional])

    return {
        loading,
        profesional,
        updateWorktimes,
        saveScheduleConfig,
        goToProfesionalSchedule,
        goToProfesionalStats
    }
}

export default useProfesional