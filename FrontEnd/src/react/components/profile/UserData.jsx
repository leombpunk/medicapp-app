import { CheckIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { PencilIcon } from '@heroicons/react/24/solid'
import { Input, InputV2, Title } from '../basis'
import useUserData from './useUserData'
import { useCharges } from '../hooks'
import { useUserContext } from '../providers/UserProvider'

const UserData = () => {
    const { user } = useUserContext()
    const { loading: isLoadingCharges, charges } = useCharges()
    const { loading, editMode, toggleEditMode, formManager } = useUserData()

    return (
        <>
            <div className='d-flex flex-column gap-4'>
                <Title Icon={UserCircleIcon} text='Perfil del Usuario'>
                    <div className='d-flex gap-2'>
                        <button
                            type='button'
                            className={`btn btn-outline-success d-flex gap-1 align-items-center ${editMode ? '' : 'd-none'}`}
                            onClick={formManager.handleSubmit}
                            title='Guardar'
                            disabled={loading}
                        >
                            <CheckIcon style={{ width: '1rem', height: '1rem', display: loading ? 'none' : 'inherit' }}/>
                            <div
                                className='spinner-border'
                                style={{ width: '1rem', height: '1rem', borderWidth: '2px', display: loading ? 'inherit' : 'none' }}
                            />
                            Guardar
                        </button>

                        <button
                            type='button'
                            className={`btn d-flex gap-1 align-items-center ${editMode ? 'btn-outline-danger' : 'btn-outline-success'}`}
                            onClick={toggleEditMode}
                            title={editMode ? 'Cancelar edición' : 'Toque para editar'}
                            disabled={loading}
                        >
                        {
                            editMode
                            ? <><XMarkIcon style={{ width: '1rem', height: '1rem' }}/> Cancelar</>
                            : <><PencilIcon style={{ width: '1rem', height: '1rem' }}/> Editar</>
                        }
                        </button>
                    </div>
                </Title>
                
                <div className='d-flex flex-column gap-3'>

                    <div className='row'>
                        <div className='col'>
                            <InputV2
                                formManager={formManager}
                                label='Apellidos'
                                name='surnames'
                                type='text'
                                disabled={!editMode}
                            />
                        </div>

                        <div className='col'>
                            <InputV2
                                formManager={formManager}
                                label='Nombres'
                                name='names'
                                type='text'
                                disabled={!editMode}
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-lg'>
                            <InputV2
                                formManager={formManager}
                                label='Usuario'
                                name='username'
                                type='text'
                                disabled={!editMode}
                            />
                        </div>

                        <div className='col-lg'>
                            {
                                !isLoadingCharges ?
                                <InputV2
                                    formManager={formManager}
                                    label='Cargo'
                                    name='idCharge'
                                    type='select'
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

                        <div className='col-lg'>
                            <Input
                                label='Rol'
                                name='idRole'
                                type='text'
                                disabled={true}
                                value={user.role.description}
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <InputV2
                                formManager={formManager}
                                label='Correo'
                                name='mail'
                                type='text'
                                disabled={!editMode}
                            />
                        </div>

                        <div className='col'>
                            <InputV2
                                formManager={formManager}
                                label='Teléfono'
                                name='phone'
                                type='text'
                                disabled={!editMode}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserData