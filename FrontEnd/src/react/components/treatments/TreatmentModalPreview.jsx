import { PencilIcon, TrashIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { Button, InputV2, ModalTemplate } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'

const TreatmentModalPreview = ({ showModal, handleClose, formManager, handlePatients, handleEdit, handleDelete, canModify }) => {
    const { experimentalMode } = useSettingsContext()
    const data = formManager.getValues()
    const idTreatment = formManager.getValues('id')

    return (
        <ModalTemplate title='Tratamiento' show={showModal} handleClose={handleClose}>
            <div className='d-flex flex-column gap-3'>
                <div>
                    <InputV2
                        formManager={formManager}
                        label='Descripción'
                        name='description'
                        type='text'
                        placeholder='Ingrese una descripción...'
                        disabled={true}
                    />
                </div>
                
                {
                    experimentalMode &&
                    <div>
                        <InputV2
                            formManager={formManager}
                            before='$'
                            label='Precio'
                            name='price'
                            type='number'
                            placeholder='0000.00'
                            disabled={true}
                        />
                    </div>
                }

                <div className='d-flex gap-2 justify-content-end'>
                    <Button
                        className='btn-outline-system'
                        Icon={UserGroupIcon}
                        text='Ver pacientes'
                        handleOnClick={() => handlePatients({ id: idTreatment })}
                    />

                    {
                        canModify &&
                        <>
                            <Button
                                className='btn-outline-system'
                                Icon={PencilIcon}
                                text='Editar'
                                handleOnClick={() => handleEdit(data)}
                            />

                            <Button
                                className='btn-outline-system'
                                Icon={TrashIcon}
                                text='Eliminar'
                                handleOnClick={() => handleDelete(data)}
                            />
                        </>
                    }

                </div>

            </div>
        </ModalTemplate>
    )
}

export default TreatmentModalPreview