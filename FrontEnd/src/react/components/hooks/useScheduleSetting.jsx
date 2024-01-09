import { useEffect, useState } from "react"
import scheduleServices from '../../services/schedule'

const useScheduleSetting = (idProfesional) => {
    const [loading, setLoading] = useState(false)
    const [setting, setSetting] = useState(null)

    const fetchSetting = async (idProfesional) => {
        try {
            setLoading(true)
            const result = await scheduleServices.getProfesionalSetting(idProfesional)
            setSetting(result.data.data)
            setLoading(false)
        } catch (error) {
            return error
        }
    }

    const updateSetting = async (setting) => {
        try {
            console.log(setting)
            const response = await scheduleServices.updateProfesionalSetting(setting.idPro, setting)
            fetchSetting(setting.idPro)
            // console.log(response)
            return response
        } catch(error) {
            return error.data
        }
    }

    useEffect(() => {
        fetchSetting(idProfesional)
    }, [idProfesional])

    return { loading, setting, updateSetting }
}

export default useScheduleSetting