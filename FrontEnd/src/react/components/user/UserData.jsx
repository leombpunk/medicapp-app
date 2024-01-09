import { useState } from 'react'
import { PencilIcon, XMarkIcon, CheckIcon, ArrowUturnLeftIcon, NoSymbolIcon, UserCircleIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import { useForm } from 'react-hook-form'
import { useNotificationsContext } from '../providers/NotificationsProvider'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaUpdateUser } from '../../constants/schemasValidations'
import { RoutesNavigation } from '../../constants/RoutesNavigation'
import { Button, Input, InputV2, Title } from '../basis'
import { useNavigate } from 'react-router-dom'
import { useCharges, useModal, useRoles } from '../hooks'
import TurnOffUserModal from './TurnOffUser'
import userServices from '../../services/users'

const UserData = ({ user, handleSaveUser, handleDeleteUser, handleActivateUser }) => {
    const navigate = useNavigate()
    const { loading: isLoadingRoles, roles } = useRoles()
    const { loading: isLoadingCharges, charges } = useCharges()
    const { addNotification } = useNotificationsContext()
    const [editMode, setEditMode] = useState(false)
    const [isLoadingUser, setIsLoadingUser] = useState(false)
    const [isLoadingOffUser, setIsLoadingOffUser] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: user, resolver: yupResolver(schemaUpdateUser) })
    const { show, handleOpen, handleClose } = useModal() 
    const toggleEditMode = () => {
        setEditMode(!editMode)
        reset(user)
    }

    const handleDelete = async () => {
        try {
            setIsLoadingOffUser(true)
            const result = await handleDeleteUser()
            if (result.status === 200) {
                addNotification('Usuario suspendido exitosamente.', 'success')
                navigate(`${RoutesNavigation.Configurations}?tab=users`)
            }
        } catch(error) {
            console.log(error)
            addNotification('Algo falló al intentar eliminar el usuario.', 'danger')
        } finally {
            setIsLoadingOffUser(false)
        }
    }

    const handleActivate = async () => {
        try {
            setIsLoadingOffUser(true)
            const response = await handleActivateUser()
            console.log({ response })
            if (response.status === 200) {
                addNotification('Usuario reactivado exitosamente.', 'primary')
                handleClose()
            }
        } catch(error) {
            console.log(error)
            addNotification('Algo falló al intentar reactivar el usuario.', 'danger')
        } finally {
            setIsLoadingOffUser(false)
        }
    }

    const handleConfirm = () => {
        if (user.isDeleted) {
            handleActivate()
        } else {
            handleDelete()
        }
    }

    const handleSave = async (data) => {
        try {
            setIsLoadingUser(true)
            const result = await handleSaveUser(data)
            if (result.status === 200) {
                addNotification('Usuario actualizado exitosamente.', 'success')
                toggleEditMode()
            }
        } catch(error) {
            console.log(error)
            if (error.response.data.status === 10062) {
                addNotification('El usuario ingresado ya está registrado en la base de datos.', 'danger')
            }else if (error.response.data.status === 10063) {
                addNotification('El correo ingresado ya está registrado en la base de datos.', 'danger')
            } else {
                addNotification('Algo falló al intentar editar el usuario.', 'danger')
            }
        } finally {
            setIsLoadingUser(false)
        }
    }

    return (
        <div className='d-flex flex-column gap-4'>
            <Title Icon={UserCircleIcon} text='Datos del Usuario'>
                <div className='d-flex gap-2'>
                    <Button
                        Icon={ArrowUturnLeftIcon}
                        handleOnClick={() => navigate(`${RoutesNavigation.Configurations}?tab=users`)}
                        text='Volver'
                        className='btn-outline-system'
                    />
                </div>
            </Title>

            <div className='d-flex flex-column gap-3'>

                <div className='d-flex flex-wrap gap-3'>
                    <div className='flex-grow-1'>
                        <InputV2
                            formManager={{ register, errors }}
                            label='Nombres'
                            name='names'
                            type='text'
                            placeholder='Nombres del usuario...'
                            disabled={!editMode}
                            //styled={`${editMode ? 'shadow-sm' : ''}`}
                        />
                    </div>

                    <div className='flex-grow-1'>
                        <InputV2
                            formManager={{ register, errors }}
                            label='Apellidos'
                            name='surnames'
                            type='text'
                            placeholder='Apellidos del usuario...'
                            disabled={!editMode}
                            //styled={`${editMode ? 'shadow-sm' : ''}`}
                        />
                    </div>
                    
                </div>

                <div className='d-flex flex-wrap gap-3'>
                    <div className='flex-grow-1'>
                        <InputV2
                            formManager={{ register, errors }}
                            label='Usuario'
                            name='username'
                            type='text'
                            placeholder='Nombre de usuario...'
                            disabled={!editMode}
                            //styled={`${editMode ? 'shadow-sm' : ''}`}
                        />
                    </div>

                    <div className='flex-grow-1'>
                        {
                            !isLoadingCharges ?
                            <InputV2
                                formManager={{ register, errors }}
                                label='Cargo'
                                name='idCharge'
                                type='select'
                                placeholder='Cargo del usuario...'
                                options={charges.map(charge => ({ value: charge.id, description: charge.description }))}
                                disabled={!editMode}
                            />
                            : <Input
                                label='Cargo'
                                name='idCharge'
                                type='select'
                                options={[]}
                                disabled={isLoadingCharges}
                            />
                        }
                    </div>
                    
                    <div className='flex-grow-1'>
                        {
                            !isLoadingRoles ?
                            <InputV2
                                formManager={{ register, errors }}
                                label='Rol'
                                name='idRole'
                                type='select'
                                placeholder='Rol del usuario...'
                                options={roles.map(role => ({ value: role.id, description: role.description }))}
                                disabled={!editMode}
                            />
                            : 
                            <Input
                                label='Rol'
                                name='idRole'
                                type='select'
                                options={[]}
                                disabled={isLoadingRoles}
                            />
                        }
                        
                    </div>
                </div>

                <div className='d-flex flex-wrap gap-3'>
                    <div className='flex-grow-1'>
                        <InputV2
                            formManager={{ register, errors }}
                            label='Telefono'
                            name='phone'
                            type='text'
                            placeholder='Telefono del usuario...'
                            disabled={!editMode}
                            //styled={`${editMode ? 'shadow-sm' : ''}`}
                        />
                    </div>

                    <div className='flex-grow-1'>
                        <InputV2
                            formManager={{ register, errors }}
                            label='Correo electronico'
                            name='mail'
                            type='email'
                            placeholder='Correo electronico del usuario...'
                            disabled={!editMode}
                            //styled={`${editMode ? 'shadow-sm' : ''}`}
                        />
                    </div>
                </div>
            </div>

            <div className='d-flex gap-2 justify-content-between'>
                {
                    user.isDeleted
                    ? <>
                        <Button
                            Icon={UserPlusIcon}
                            handleOnClick={handleOpen}
                            text='Reactivar'
                            title='Toque para reactivar la cuenta'
                            className='btn-outline-primary'
                            isDisabled={editMode}
                        />
                    </>
                    : <>
                        <Button
                            Icon={NoSymbolIcon}
                            handleOnClick={handleOpen}
                            text='Suspender'
                            title='Toque para suspender la cuenta'
                            className='btn-outline-danger'
                            isDisabled={editMode}
                        />
                    </>
                }

                <div className='d-flex gap-2'>
                {
                    !user.isDeleted &&
                    <>
                        {
                            editMode
                            ? <>
                                <Button
                                    Icon={CheckIcon}
                                    handleOnClick={handleSubmit(handleSave)}
                                    text='Guardar'
                                    title='Toque para guardar'
                                    className='btn-outline-success'
                                    isLoading={isLoadingUser}
                                    isDisabled={isLoadingUser}
                                />
                                <Button
                                    Icon={XMarkIcon}
                                    handleOnClick={toggleEditMode}
                                    text='Cancelar'
                                    title='Toque para cancelar'
                                    className='btn-outline-secondary'
                                />
                            </>
                            : <>
                                <Button
                                    Icon={PencilIcon}
                                    handleOnClick={toggleEditMode}
                                    text='Editar'
                                    title='Toque para editar'
                                    className='btn-outline-success'
                                />
                                
                            </>
                        }
                    </>
                }

                </div>
            </div>

            <TurnOffUserModal show={show} handleClose={handleClose} handleConfirm={handleConfirm} isLoading={isLoadingOffUser} user={user}/>
        </div>
    )
}

export default UserData;