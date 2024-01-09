import { useState } from 'react'
import { CheckIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { InputV2, Title } from '../basis'
import { useForm } from 'react-hook-form'
import { useNotificationsContext } from '../providers/NotificationsProvider'
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaPatient, schemaPatientEdit } from "../../constants/schemasValidations"

const getYearsOlds = (birthdate) => {
    const ageDifferent = Date.now() - new Date(birthdate).getTime()
    const ageDate = new Date(ageDifferent)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
}

const PatientData = ({ patient, handleEditPatient }) => {
    const [editMode, setEditMode] = useState(false)
    const { register, formState: { errors }, reset, handleSubmit } = useForm({ defaultValues: patient, resolver: yupResolver(schemaPatientEdit) })
    const { addNotification } = useNotificationsContext()
    
    const toggleEditMode = () => {
        setEditMode(!editMode)
        reset(patient)
    }

    const handleEdit = async (data) => {
        try {
            const response = await handleEditPatient(data)
            console.log({ response })
            if (response.status === 200) {
                addNotification('Paciente editado exitosamente.', 'success')
            }
            if (response.status === 1062) {
                addNotification('El DNI ingresado ya se encuentra ingresado en la base de datos.', 'danger')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='d-flex flex-column gap-4'>
            
            <Title Icon={UserCircleIcon} text='Datos del Paciente'>
                <div className='d-flex gap-2'>
                    <button
                        type='button'
                        className={`btn btn-outline-success d-flex gap-1 align-items-center ${editMode ? '' : 'd-none'}`}
                        onClick={handleSubmit(handleEdit)}
                        title='Guardar'
                    >
                        <CheckIcon style={{ width: '1rem', height: '1rem' }}/>
                        Guardar
                    </button>

                    <button
                        type='button'
                        className={`btn d-flex gap-1 align-items-center ${editMode ? 'btn-outline-danger' : 'btn-outline-success'}`}
                        onClick={toggleEditMode}
                        title={editMode ? 'Cancelar edición' : 'Toque para editar'}
                    >
                        {
                            editMode
                            ? <><XMarkIcon style={{ width: '1rem', height: '1rem' }}/> Cancelar</>
                            : <><PencilIcon style={{ width: '1rem', height: '1rem' }}/> Editar</>
                        }
                    </button>
                </div>
            </Title>

            <form className='d-flex flex-column gap-3'>
                <div className='row'>
                    <div className='col'>
                        <InputV2
                            formManager={{ register, errors }}
                            label='Apellidos'
                            name='surnames'
                            type='text'
                            placeholder='Apellidos del paciente'
                            disabled={!editMode}
                        />
                    </div>

                    <div className='col'>
                        <InputV2
                            formManager={{ register, errors }}
                            label='Nombres'
                            name='names'
                            type='text'
                            placeholder='Nombres del paciente'
                            disabled={!editMode}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-lg'>
                        <InputV2
                            formManager={{ register, errors }}
                            label='DNI'
                            name='dni'
                            type='number'
                            placeholder='DNI del paciente'
                            disabled={!editMode}
                        />
                    </div>
                    
                    <div className='col-lg'>
                        <InputV2
                            formManager={{ register, errors }}
                            label='Fecha de Nacimiento'
                            name='birthdate'
                            type='date'
                            after={!editMode ? `${getYearsOlds(patient.birthdate)} años` : ''}
                            disabled={!editMode}
                        />
                    </div>

                    <div className='col-lg'>
                        <InputV2
                            formManager={{ register, errors }}
                            label='Teléfono'
                            name='phone'
                            type='text'
                            placeholder='Teléfono del paciente'
                            disabled={!editMode}
                        />
                    </div>
                </div>

                <div className='row'>
                    <InputV2
                        formManager={{ register, errors }}
                        label='Dirección'
                        name='address'
                        type='text'
                        placeholder='Dirección del paciente'
                        disabled={!editMode}
                    />
                </div>
            </form>
        </div>
    )
}

export default PatientData;