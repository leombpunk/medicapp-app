import { useForm } from "react-hook-form"
import { schemaUpdateUserPass } from "../../constants/schemasValidations"
import { yupResolver } from "@hookform/resolvers/yup"
import userServices from "../../services/users"
import { useNotificationsContext } from '../providers/NotificationsProvider'
import { useUserContext } from "../providers/UserProvider"
import { useState } from "react"

const useProfilePass = () => {
    const { user } = useUserContext()
    const { register, formState: { errors }, handleSubmit, reset } = useForm({ resolver: yupResolver(schemaUpdateUserPass) })
    const { addNotification } = useNotificationsContext()
    const [isLoading, setIsLoading] = useState(false)

    const handleUpdatePass = async (data) => {
        try {
            setIsLoading(false)
            const response = await userServices.updateUserPass(user.id, data)

            if (response.status === 401) {
                addNotification('La constraseña ingresada no es correcta', 'danger')
            }

            if (response.status === 200) {
                addNotification('Constraseña actualizada exitosamente', 'success')
                reset({ oldPassword: '', newPassword: '', confirmpassword: ''})
            }
        } catch (error) {
            addNotification('Ha ocurrido un error al intentar actualizar la contraseña', 'danger')
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        formManager: { register, errors, handleSubmit: handleSubmit(handleUpdatePass) },
    }
}

export default useProfilePass