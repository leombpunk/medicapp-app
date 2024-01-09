import { useState } from 'react'
import useModal from '../../hooks/useModal'
import { useNotificationsContext } from '../../providers/NotificationsProvider'

const useFileDeleteModal = (handleDeleteFile) => {
    const { addNotification } = useNotificationsContext()
    const { show, handleOpen, handleClose } = useModal()
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(undefined)

    const handleConfirm = async () => {
        setLoading(true)
        const result = await handleDeleteFile(file.id)
        setLoading(false)
        console.log(result)

        if (result.status === 200) {
            handleClose()
            addNotification('Archivo eliminado exitosamente.', 'success')
        }
        if (result.status === 409) {
            handleClose()
            addNotification('Occurrió un error al tratar de eliminar el archivo.', 'success')
        }
    }

    const customHandleOpen = (file) => {
        setFile(file)
        handleOpen()
    }

    const customHandleClose = () => {
        setFile(undefined)
        handleClose()
    }

    return {
        file,
        show,
        loading,
        handleOpen: customHandleOpen,
        handleClose: customHandleClose,
        handleConfirm
    }
}

export default useFileDeleteModal