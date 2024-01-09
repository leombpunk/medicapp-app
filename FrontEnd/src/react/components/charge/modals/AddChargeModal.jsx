import { PlusIcon, PencilIcon } from '@heroicons/react/24/solid'
import { InputV2, ModalTemplate } from '../../basis'
import { useForm } from 'react-hook-form'
import useModal from '../../hooks/useModal'
import { useNotificationsContext } from '../../providers/NotificationsProvider'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaCharge } from '../../../constants/schemasValidations'

const AddPatientModal = ({ handleAddCharge, charge = null, editMode = false, buttonName }) => {
    const { addNotification } = useNotificationsContext()
    const { show, handleOpen, handleClose } = useModal()
    const { register, formState: { errors }, reset, handleSubmit } = useForm({
        defaultValues: charge,
        resolver: yupResolver(schemaCharge)
    })

    const handleSave = async (data) => {
        // console.log(data)
        const result = await handleAddCharge(data)
        if (result.status === 201) {
            addNotification('Cargo añadido exitosamente.', 'success')
            handleClose()
        }
        else if (result.status === 200){
            addNotification('Cargo modificado exitosamente.', 'success')
            handleClose()
        }
        else {
            addNotification('Se produjo un error en la operación.', 'danger')
        }
    }

    const customHandleOpen = () => {
        reset() //reinicia el formulario
        handleOpen() //abre el modal
        // si el cargo no es null lo puedo cargar
    }

    return (
        <>
            <button className={`btn ${editMode ? 'btn-outline-success':'btn-outline-primary'} width-auto`} onClick={customHandleOpen}>
                <div className='d-flex align-items-center gap-1'>
                    {editMode ? 
                        <PencilIcon style={{width: '1.25rem', height:'1.25rem'}}/>
                    :
                        <PlusIcon style={{width: '1.25rem', height:'1.25rem'}}/>}
                    <div>
                        {editMode ? 'Editar' : 'Añadir'}
                    </div>
                </div>
            </button>

            <ModalTemplate title={editMode ? 'Editar Cargo':'Añadir Cargo'} show={show} handleClose={handleClose}>
                <form onSubmit={handleSubmit(handleSave)}>
                    <div className='d-flex flex-column gap-3 mb-4'>

                        <div className='row'>
                            <InputV2
                                formManager={{ register, errors }}
                                label='Cargo'
                                name='description'
                                type='text'
                                placeholder='Descripción del cargo...'
                                
                            />
                        </div>

                    </div>

                    <div className='d-flex justify-content-end'>
                        <button type='submit' className='btn btn-success'>{editMode?'Actualizar':'Guardar'}</button>
                    </div>
                </form>
            </ModalTemplate>
        </>
    );
}

export default AddPatientModal