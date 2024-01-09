import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNotificationsContext } from '../providers/NotificationsProvider'
import { useLogin } from './'
import userServices from '../../services/auth'

const useRegister = () => {
    const { addNotification } = useNotificationsContext()
    const [loading, setLoading] = useState(false)
    const { register, formState: { errors }, reset, getValues, handleSubmit } = useForm()
    const [seePassword, setSeePasword] = useState(false)
    const { loginUser } = useLogin()
    
    const registerUser = async (data) => {
        try {
            setLoading(true)
            const user = {
                surnames: data.surnames,
                names: data.names,
                username: data.username,
                password: data.password,
                mail: 'test@mail.com',
                idRole: 2,
                idCharge: data.charge
            }

            const response = await userServices.register(user)

            if (response.status === 201) {
                addNotification('Registrado exitosamente.', 'primary')
                setTimeout(() => {
                    loginUser({
                        username: data.username,
                        password: data.password
                    })
                })
            }
            //setLoading(false)
        } catch (error) {
            console.log(error.request)
            setLoading(false)
        }
    }

    const toggleSeePassword = () => {
        setSeePasword(seePassword => !seePassword)
    }

    return {
        loading,
        seePassword,
        toggleSeePassword,
        formManager: { register, errors, reset, getValues, handleSubmit: handleSubmit((data) => registerUser(data)) }
    }
}

export default useRegister