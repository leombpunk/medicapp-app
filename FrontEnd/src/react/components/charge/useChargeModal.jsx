import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useModal } from '../hooks'
import { MODALMODES } from '../../constants/modal'
import { useNotificationsContext } from '../providers/NotificationsProvider'
import { schemaCharge } from '../../constants/schemasValidations'
import { yupResolver } from '@hookform/resolvers/yup'

const useChargeModal = ({ createCharge, editCharge, deleteCharge }) => {
    const { addNotification } = useNotificationsContext()
    const [loading, setLoading] = useState(false)
    const [mode, setMode] = useState(MODALMODES.Add)
    const { show, handleOpen, handleClose} = useModal()
    const formManager = useForm({ resolver: yupResolver(schemaCharge) })

    const handleOpenModal = (modalMode, data) => {
        setMode(modalMode ?? MODALMODES.Add)
        formManager.reset(data ?? { id: '', description: '' })
        handleOpen()
    }

    const handleConfirm = async (data) => {
        try {
            setLoading(true)
            /* Add */
            if (mode === MODALMODES.Add) {
                const charge = { description: data.description }
                const response = await createCharge(charge)

                console.log({ response })

                if (response.status === 1062) {
                    addNotification('Descripción duplicada.', 'danger')
                }

                if (response.status === 201) {
                    addNotification('Cargo creado exitosamente.', 'primary')
                    handleClose()
                }
            }
            /* Edit */
            if (mode === MODALMODES.Edit) {
                const idCharge = data.id
                const charge = { description: data.description }
                const response = await editCharge(idCharge, charge)

                if (response.status === 1062) {
                    addNotification('Descripción duplicada.', 'danger')
                }

                if (response.status === 200) {
                    addNotification('Cargo editado exitosamente.', 'success')
                    handleClose()
                }
            }
            /* Delete */
            if (mode === MODALMODES.Delete) {
                const idCharge = data.id
                const response = await deleteCharge(idCharge)

                if (response.status === 200) {
                    addNotification('Cargo eliminado exitosamente.', 'success')
                    handleClose()
                }
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    
    return {
        loading,
        mode,
        show,
        handleOpen: handleOpenModal,
        handleClose,
        formManager: { ...formManager, handleSubmit: formManager.handleSubmit(handleConfirm), errors: formManager.formState.errors}
    }
}

export default useChargeModal