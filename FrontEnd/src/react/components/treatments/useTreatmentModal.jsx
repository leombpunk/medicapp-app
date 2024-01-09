import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useModal } from '../hooks'
import { MODALMODES } from '../../constants/modal'
import { useNotificationsContext } from '../providers/NotificationsProvider'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaTreatment } from '../../constants/schemasValidations'

const useTreatmentModal = ({ createTreatment, editTreatment, deleteTreatment }) => {
    const { addNotification } = useNotificationsContext()
    const [loading, setLoading] = useState(false)
    const [mode, setMode] = useState(MODALMODES.Add)
    const { show, handleOpen, handleClose} = useModal()
    const formManager = useForm({ resolver: yupResolver(schemaTreatment) })

    const handleOpenModal = (modalMode, data) => {
        setMode(modalMode ?? MODALMODES.Add)
        formManager.reset(data ?? { id: '', description: '', price: '' })
        handleOpen()
    }

    const handleConfirm = async (data) => {
        try {
            setLoading(true)
            /* Add */
            if (mode === MODALMODES.Add) {
                const treatment = { description: data.description, price: data.price }
                const response = await createTreatment(treatment)

                if (response.status === 1062) {
                    addNotification('Ya existe un tratamiento con esta descripción.', 'danger')
                }

                if (response.status === 201) {
                    addNotification('Tratamiento creado exitosamente.', 'primary')
                    handleClose()
                }
            }
            /* Edit */
            if (mode === MODALMODES.Edit) {
                const idTreatment = data.id
                const treatment = { description: data.description, price: data.price }
                const response = await editTreatment(idTreatment, treatment)

                if (response.status === 1062) {
                    addNotification('Ya existe un tratamiento con esta descripción.', 'danger')
                }

                if (response.status === 200) {
                    addNotification('Tratamiento editado exitosamente.', 'success')
                    handleClose()
                }
            }
            /* Delete */
            if (mode === MODALMODES.Delete) {
                const idTreatment = data.id
                const response = await deleteTreatment(idTreatment)

                console.log({ response })

                if (response.status === 1451) {
                    addNotification('No se puede eliminar el tratamiento ya que fue asignado en uno o más turnos.', 'danger')
                }

                if (response.status === 200) {
                    addNotification('Tratamiento eliminado exitosamente.', 'success')
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

export default useTreatmentModal