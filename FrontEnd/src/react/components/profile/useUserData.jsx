import { useState } from 'react'
import { useNotificationsContext } from '../providers/NotificationsProvider'
import { useForm } from 'react-hook-form'
import userServices from '../../services/auth'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaUpdateProfile } from '../../constants/schemasValidations'
import { useUserContext } from '../providers/UserProvider'

const useUserData = () => {
    const { user, handleLogIn } = useUserContext()
    const [editMode, setEditMode] = useState(false)
    const { addNotification } = useNotificationsContext()
    const [loading, setLoading] = useState(false)
    const { register, formState: { errors }, reset, handleSubmit } = useForm({
        defaultValues: { ...user, idCharge: user.charge.id },
        resolver: yupResolver(schemaUpdateProfile)
    })
    
    const toggleEditMode = () => {
        setEditMode(!editMode)
        reset({ ...user, idCharge: user.charge.id })
    }

    const handleEditUser = async (data) => {
        try {
            setLoading(true)
            const editUser = {
                //id: data.id,
                names: data.names,
                surnames: data.surnames,
                username: data.username,
                mail: data.mail,
                phone: data.phone,
                idCharge: data.idCharge,
                //idRole: data.role
            }
            //const result = await userServices.updateUser(user.id, editUser)
            const result = await userServices.update(editUser)
            setLoading(false)
            if (result.status === 200) {
                setEditMode(false)
                //actualizar el user provider con los nuevos datos
                addNotification('Datos editados exitosamente.', 'success')
                handleLogIn(result.data)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return {
        loading,
        editMode,
        toggleEditMode,
        // handleEditUser,
        formManager: { register, errors, handleSubmit: handleSubmit((data) => handleEditUser(data)) }
    }
}

export default useUserData