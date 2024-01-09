import { useForm } from 'react-hook-form'
import { useModal } from '../../hooks'
import { useState } from 'react'
import { MODALMODES } from '../../../constants/modal'
import { useNotificationsContext } from '../../providers/NotificationsProvider'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaNotes } from '../../../constants/schemasValidations'

const useNotesModal = ({ createNote, editNote, deleteNote }) => {
    const { addNotification } = useNotificationsContext()
    const formManager = useForm({ resolver: yupResolver(schemaNotes) })
    const [loading, setLoading] = useState(false)
    const { show, handleOpen, handleClose } = useModal()
    const [mode, setMode] = useState(MODALMODES.Add)

    const handleOpenModal = (mode) => {
        if (mode === MODALMODES.Add) {
            formManager.reset({ content: '' })
        }

        setMode(mode ?? MODALMODES.Add)
        handleOpen()
    }

    const handleConfirm = async (data) => {
        try {
            setLoading(true)
            /* Add */
            if (mode === MODALMODES.Add) {
                const note = { content: data.content }
                const response = await createNote(note)

                if (response.status === 201) {
                    addNotification('Nota creada exitosamente.', 'primary')
                    handleClose()
                }    
            }

            /* Edit */
            if (mode === MODALMODES.Edit) {
                const idNote = data.id
                const note = { content: data.content }
                const response = await editNote(idNote, note)

                if (response.status === 200) {
                    addNotification('Nota editada exitosamente.', 'success')
                    handleClose()
                }    
            }

             /* Delete */
             if (mode === MODALMODES.Delete) {
                const idNote = data.id
                const response = await deleteNote(idNote)

                if (response.status === 200) {
                    addNotification('Nota eliminada exitosamente.', 'danger')
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
        formManager: {...formManager, handleSubmit: formManager.handleSubmit(handleConfirm), isLoading: loading },
        loading,
        show,
        mode,
        handleOpen: handleOpenModal,
        handleClose
    }
}

export default useNotesModal