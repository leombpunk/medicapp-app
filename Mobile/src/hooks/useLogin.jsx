import { useRef, useState } from 'react'
import { useUserContext } from '../providers/UserProvider'
//import { ToastAndroid } from 'react-native'
import authServices from '../services/auth'

const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { handleLogIn } = useUserContext()
    const username = useRef()
    const password = useRef()

    const login = async () => {
        try {
            setIsLoading(true)
            const formData = {
                user: username.current.value,
                password: password.current.value,
            }

            const response = await authServices.login(formData)
            if (response.status === 200) {
                handleLogIn(response.data)
                ToastAndroid.show('Iniciando sesión...', ToastAndroid.SHORT)
            } else {
                if (response.status === 404) {
                    ToastAndroid.show('El usuario o correo ingresados no están registrados', ToastAndroid.SHORT)
                }
                if (response.status === 409) {
                    ToastAndroid.show('La contraseña ingresada no es válida', ToastAndroid.SHORT)
                }
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        form: { username, password, handleSubmit: login }
    }
}

export default useLogin
