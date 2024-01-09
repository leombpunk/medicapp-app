import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoutesNavigation } from '../../constants/RoutesNavigation'
import userServices from '../../services/auth'
import { useUserContext } from '../providers/UserProvider'
import { useForm } from 'react-hook-form'
import { useNotificationsContext } from '../providers/NotificationsProvider'

const useLogin = () => {
    const { addNotification } = useNotificationsContext()
    const { handleLogIn } = useUserContext()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { register, formState: { errors }, reset, handleSubmit } = useForm()
    const [seePassword, setSeePasword] = useState(false)

    const toggleSeePassword = () => {
        setSeePasword(seePassword => !seePassword)
    }

    const loginUser = async (data) => {
        try {
            setLoading(true)
            const response = await userServices.login(data)
            const result = response.data
            if (result.status === 200) {
                handleLogIn(result.data)
                // navigate(RoutesNavigation.Patients)
                navigate(RoutesNavigation.Home)
            }
        } catch (error) {
            console.log({ error })
            if (error.request.status === 409) {
                addNotification('La contraseña ingresada no es válida.', 'danger')
            } else if (error.request.status === 404) {
                addNotification('El usuario ingresado no existe.', 'danger')
            } else {
                addNotification('Error al intentar conectarse al servidor.', 'danger')
            }
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        loginUser,
        formManager: { register, errors, reset, handleSubmit: handleSubmit((data) => loginUser(data)) },
        seePassword,
        toggleSeePassword
    }
}

export default useLogin