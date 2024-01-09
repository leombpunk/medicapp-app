import { PlusIcon } from "@heroicons/react/24/solid";
import { Button, InputV2, ModalTemplate, ToggleSeeButton } from "../../basis"
import { useNotificationsContext } from '../../providers/NotificationsProvider'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaCreateUser } from '../../../constants/schemasValidations'
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCharges, useRoles, useModal } from "../../hooks";
import { useState } from "react";
import userServices from "../../../services/users";

const AddUserModal = ({ handleAddUser }) => {
    const { addNotification } = useNotificationsContext()
    const { show, handleOpen, handleClose } = useModal()
    const { register, formState: { errors }, reset, getValues, setError, clearErrors, handleSubmit } = useForm({ resolver: yupResolver(schemaCreateUser) })
    const { charges } = useCharges()
    const { roles } = useRoles()
    const [loading, setLoading] = useState(false)
    const [seePassword, setSeePassword] = useState(false)

    const toggleSeePassword = () => {
        setSeePassword(see => !see)
    }

    const handleSave = async (data) => {
        try {
            setLoading(true)
            const response = await handleAddUser(data)
            console.log({ response })

            if (response.status === 10062) {
                addNotification('El nombre de usuario se encuentra en uso.', 'danger')
            }

            if (response.status === 10063) {
                addNotification('El correo se encuentra en uso.', 'danger')
            }

            if (response.status === 201) {
                addNotification('Usuario añadido exitosamente.', 'primary')
                handleClose()
            }
        } catch (error) {
            console.log({ error })
        } finally {
            setLoading(false)
        }
    }

    const customHandleOpen = () => {
        reset()
        handleOpen()
    }

    const checkUsername = async () => {
        try {
            clearErrors('username')
            const username = getValues('username')
            const result = await userServices.getUserByUsername(username)
            if (result.data) {
                setError('username', { type: 'custom', message: 'El usuario ingresado ya está en uso' })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const checkMail = async () => {
        try {
            clearErrors('mail')
            const mail = getValues('mail')
            const result = await userServices.getUserByMail(mail)
            if (result.data) {
                setError('mail', { type: 'custom', message: 'El correo ingresado ya está en uso' })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div>
                <Button
                    className='btn-outline-primary'
                    Icon={PlusIcon}
                    text='Añadir'
                    handleOnClick={customHandleOpen}
                />
            </div>

            <ModalTemplate title='Añadir Usuario' show={show} handleClose={handleClose} modalSize='modal-lg'>
                <div className="d-flex flex-column gap-3">
                    <div className="row">
                        <div className="col">
                            <InputV2
                                formManager={{ register, errors }}
                                label='Nombres'
                                name='names'
                                type='text'
                                placeholder='Nombres del usuario...'
                            />
                        </div>
                        <div className="col">
                            <InputV2
                                formManager={{ register, errors }}
                                label='Apellidos'
                                name='surnames'
                                type='text'
                                placeholder='Apellidos del usuario...'
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <InputV2
                                formManager={{ register, errors }}
                                label='Usuario'
                                name='username'
                                type='text'
                                placeholder='Nombre de usuario...'
                                onBlur={checkUsername}
                            />
                        </div>
                        <div className="col">
                            <InputV2
                                formManager={{ register, errors }}
                                label='Telefono'
                                name='phone'
                                type='text'
                                placeholder='Teléfono del usuario... Ej: +54 9 #### ######'
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <InputV2
                                formManager={{ register, errors }}
                                label='Correo'
                                name='mail'
                                type='email'
                                placeholder='E-mail del usuario...'
                                onBlur={checkMail}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <InputV2
                                formManager={{ register, errors }}
                                label='Rol'
                                name='idRole'
                                type='select'
                                placeholder='Rol del usuario...'
                                options={roles.map(rol => ({ description: rol.description, value: rol.id }))}
                            />
                        </div>
                        <div className="col">
                            <InputV2
                                formManager={{ register, errors }}
                                label='Cargo'
                                name='idCharge'
                                type='select'
                                placeholder='Cargo del usuario...'
                                options={charges.map(charge => ({ description: charge.description, value: charge.id }))} 
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <InputV2
                                formManager={{ register, errors }}
                                label='Contraseña'
                                name='password'
                                type={seePassword ? 'text' : 'password'}
                                after={<ToggleSeeButton enabled={seePassword} handleSee={toggleSeePassword}/>}
                            />
                        </div>

                        <div className="col">
                            <InputV2
                                formManager={{ register, errors }}
                                label='Repetir contraseña'
                                name='confirmpassword'
                                type={seePassword ? 'text' : 'password'}
                                after={<ToggleSeeButton enabled={seePassword} handleSee={toggleSeePassword}/>}
                            />
                        </div>
                    </div>

                    <div className='d-flex justify-content-end gap-2'>
                        <Button
                            className='btn-outline-success'
                            Icon={CheckIcon}
                            text='Guardar'
                            handleOnClick={handleSubmit(handleSave)}
                            isLoading={loading}
                            isDisabled={loading}
                        />
                        <Button
                            className='btn-outline-system'
                            Icon={XMarkIcon}
                            text='Cancelar'
                            handleOnClick={handleClose}
                        />
                    </div>
                </div>
            </ModalTemplate>
        </>
    );
}

export default AddUserModal