import { PlusIcon } from '@heroicons/react/24/solid'
import { InputV2, ModalTemplate } from '../../basis'
import { useForm } from 'react-hook-form'
import useModal from '../../hooks/useModal'
import { useNotificationsContext } from '../../providers/NotificationsProvider'
import patientServices from '../../../services/patients'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaPatient } from '../../../constants/schemasValidations'

const AddPatientModal = ({ handleAddPatient }) => {
    const { addNotification } = useNotificationsContext()
    const { show, handleOpen, handleClose } = useModal()
    const { register, formState: { errors }, reset, getValues, setError, clearErrors, handleSubmit } = useForm({ resolver: yupResolver(schemaPatient) })

    const handleSave = async (data) => {
        try {
            const response = await handleAddPatient(data)
            if (response.status === 1062) {
                addNotification('El DNI ingresado ya se encuentra ingresado en la base de datos.', 'danger')
            }
            if (response.status === 201) {
                addNotification('Paciente añadido exitosamente.', 'primary')
                handleClose()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const customHandleOpen = () => {
        reset()
        handleOpen()
    }
    
    const checkDNI = async () => {
        try {
            clearErrors('dni')
            const dni = getValues('dni')
            const result = await patientServices.getPatientByDNI(dni)

            if (result.data) {
                setError('dni', { type: 'custom', message: 'El DNI ingresado ya ha sido registrado' })
            }
        } catch (error) {
            console.log(error)
        }
    }
    /*
    const controlDNI = async (dni) => {
        try {
            const result = await patientServices.getPatientByDNI(dni)
            return result.data ? 'El dni ingresado ya está registrado' : true
        } catch (error) {
            return 'Error'
        }
    }
    */
    return (
        <>
            <button className='btn btn-outline-primary width-auto' onClick={customHandleOpen}>
                <div className='d-flex align-items-center gap-1'>
                    <PlusIcon style={{width: '1.25rem', height:'1.25rem'}}/>
                    <div>
                        Añadir
                    </div>
                </div>
            </button>

            <ModalTemplate title={'Añadir Paciente'} show={show} handleClose={handleClose}>
                <form onSubmit={handleSubmit(handleSave)}>
                    <div className='d-flex flex-column gap-3 mb-4'>

                        <div className='row'>
                            <InputV2
                                formManager={{ register, errors }}
                                label='DNI'
                                name='dni'
                                type='number'
                                placeholder='DNI del paciente...'
                                //errors={{ validate: controlDNI }}
                                onBlur={checkDNI}
                            />
                        </div>

                        <div className='row'>
                            <InputV2
                                formManager={{ register, errors }}
                                label='Apellidos'
                                name='surnames'
                                type='text'
                                placeholder='Apellidos del paciente...'
                            />
                        </div>

                        <div className='row'>
                            <InputV2
                                formManager={{ register, errors }}
                                label='Nombres'
                                name='names'
                                type='text'
                                placeholder='Nombres del paciente...'
                            />
                        </div>

                        <div className='row'>
                            <InputV2
                                formManager={{ register, errors }}
                                label='Fecha de Nacimiento'
                                name='birthdate'
                                type='date'
                            />
                        </div>

                        <div className='row'>
                            <InputV2
                                formManager={{ register, errors }}
                                label='Teléfono'
                                name='phone'
                                type='text'
                                placeholder='Teléfono del paciente... Ej: +54 9 #### ######'
                            />
                        </div>

                        <div className='row'>
                            <InputV2
                                formManager={{ register, errors }}
                                label='Dirección'
                                name='address'
                                type='text'
                                placeholder='Dirección del paciente...'
                            />
                        </div>

                    </div>

                    <div className='d-flex justify-content-end'>
                        <button type='submit' className='btn btn-success'>Guardar</button>
                    </div>
                </form>
            </ModalTemplate>
        </>
    );
}

export default AddPatientModal