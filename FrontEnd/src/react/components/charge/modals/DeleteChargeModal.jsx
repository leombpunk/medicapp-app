import { useForm } from "react-hook-form"
import { TrashIcon } from "@heroicons/react/24/solid"
import { ModalTemplate } from '../../basis'
import useModal from '../../hooks/useModal'
import { useNotificationsContext } from '../../providers/NotificationsProvider'

const DeleteChargeModal = ({ handleDeleteCharge, charge = null }) => {
    const { addNotification } = useNotificationsContext()
    const { show, handleOpen, handleClose } = useModal()
    const { handleSubmit } = useForm()

    const customHandleOpen = () => {
        handleOpen() //abre el modal
        // si el cargo no es null lo puedo cargar
    }

    const handleDelete = async () => {
        // console.log(charge)
        const result = await handleDeleteCharge(charge.id)
        // console.log(result)
        // addNotification('Cargo borrado exitosamente', 'success')
        if (result.status === 200) {
            addNotification('Cargo borrado exitosamente.', 'success')
        }
        else {
            addNotification('No se puede borrar el cargo.', 'danger')
        }
        handleClose()
    }
    return (
        <>
            <button className='btn btn-outline-danger width-auto' onClick={customHandleOpen}>
                <div className='d-flex align-items-center gap-1'>
                        <TrashIcon style={{width: '1.25rem', height:'1.25rem'}}/>
                    <div>
                        Borrar
                    </div>
                </div>
            </button>

            <ModalTemplate title='Borrar Cargo' show={show} handleClose={handleClose}>
                <form onSubmit={handleSubmit(handleDelete)}>
                    <div className='d-flex flex-column gap-3 mb-4'>
                        <p className='text-center fs-5'>Desea borrar el cargo <span className='fw-bold fst-italic'>{`${charge.description}`}</span> ?</p>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button type='submit' className='btn btn-danger'>Borrar</button>
                    </div>
                </form>
            </ModalTemplate>
        </>
    )
}

export default DeleteChargeModal