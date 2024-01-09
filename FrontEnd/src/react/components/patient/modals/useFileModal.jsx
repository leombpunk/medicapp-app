import { useUserContext } from '../../providers/UserProvider'
import { useState } from 'react'
import useModal from '../../hooks/useModal'
import { useForm } from 'react-hook-form'
import { useNotificationsContext } from '../../providers/NotificationsProvider'
import { MODALMODES } from '../../../constants/modal'

const useFileModal = (idPatient, handleCreateFile, handleEditFile, handleDeleteFile) => {
    const { addNotification } = useNotificationsContext()
    const { user } = useUserContext()
    const { show, handleOpen, handleClose } = useModal()
    const { register, formState: { errors }, reset, setValue, handleSubmit, getValues } = useForm()
    const [mode, setMode] = useState(MODALMODES.Add)
    const [loading, setLoading] = useState(false)

    const {
        show: showAlert,
        handleOpen: handleOpenAlert,
        handleClose: handleCloseAlert
    } = useModal()

    const handleOpenModal = (data, modalMode) => {
        setMode(modalMode ?? MODALMODES.Add)
        reset(data)
        handleOpen()
    }

    const handleOpenEditMode = (data) => {
        handleOpenModal(data, MODALMODES.Edit)
    }

    const handleOpenDeleteMode = (data) => {
        handleOpenModal(data, MODALMODES.Delete)
    }

    const handleEditMode = () => {
        setMode(MODALMODES.Edit)
    }

    const handleDeleteMode = () => {
        setMode(MODALMODES.Delete)
    }

    const handleConfirm = async (data) => {
        try {
            setLoading(true)
            /* Add */
            if (mode === MODALMODES.Add) {
                const file = {
                    file: data.file[0],
                    name: data.file[0].name,
                    description: data.description,
                    createdBy: user.id,
                    idPatient
                }

                const formData = new FormData()
                formData.set('file', file.file)
                formData.set('name', file.name)
                formData.set('description', file.description)
                formData.set('createdBy', file.createdBy)
                formData.set('idPatient', file.idPatient)

                const result = await handleCreateFile(formData)

                console.log(result)

                if (result.status === 1062) {
                    addNotification('Archivo añadido exitosamente.', 'primary')
                }

                if (result.status === 201) {
                    handleClose()
                    addNotification('Archivo añadido exitosamente.', 'primary')
                }
                if (result.status === 409) {
                    //handleClose()
                    //setMode(MODALMODES.Edit)
                    //setValue('id', result.data.result.id)
                    //setValue('name', file.name)
                    //setValue('description', file.description)
                    addNotification('Ya existe un documento o fotografía con el mismo nombre de archivo.', 'danger')
                }
            }
            /* Edit */
            if (mode === MODALMODES.Edit) {
                const id = data.id
                const file = {
                    file: data.file ? data.file[0] : undefined,
                    name: data.name ? data.name : data.file[0].name,
                    description: data.description,
                    modifiedBy: user.id
                }

                const formData = new FormData()
                formData.set('file', file.file)
                formData.set('name', file.name)
                formData.set('description', file.description)
                formData.set('modifiedBy', file.modifiedBy)

                const result = await handleEditFile(id, formData)

                console.log(result)

                if (result.status === 1062) {
                    addNotification('Ya existe un documento o fotografía con el mismo nombre de archivo.', 'danger')
                }

                if (result.status === 200) {
                    handleClose()
                    handleCloseAlert()
                    addNotification('Archivo editado exitosamente.', 'success')
                }
            }
            /* Delete */
            if (mode === MODALMODES.Delete) {
                const id = data.id
                const result = await handleDeleteFile(id)

                if (result.status === 200) {
                    handleClose()
                    addNotification('Archivo eliminado exitosamente.', 'success')
                }
                
                if (result.status === 409) {
                    handleClose()
                    addNotification('Occurrió un error al tratar de eliminar el archivo.', 'success')
                }
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    return {
        show,
        mode,
        loading,
        handleOpen: handleOpenModal,
        handleOpenEditMode,
        handleOpenDeleteMode,
        handleClose,
        handleEditMode,
        handleDeleteMode,
        alert: { showAlert, handleOpenAlert, handleCloseAlert },
        formManager: { register, errors, reset, handleSubmit: handleSubmit(handleConfirm), getValues },
    }
}

export default useFileModal