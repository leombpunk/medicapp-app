import { CheckIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Button, InputV2, ModalTemplate } from '../basis'

const WorktimeModal = ({ modalShow, handleClose, formManager }) => {
    const idWorktime = formManager.getValues('id')

    return (
        <>
            {
                <ModalTemplate show={modalShow} title={'Worktimes'} handleClose={handleClose}>
                    <div className='d-flex flex-column gap-4'>

                        <div className='d-flex flex-column gap-3'>
                            <div className='row'>
                                <InputV2
                                    formManager={{ register: formManager.register, errors: formManager.formState.errors }}
                                    label='Inicio'
                                    name='startTime'
                                    type='time'
                                />
                            </div>

                            <div className='row'>
                                <InputV2
                                    formManager={{ register: formManager.register, errors: formManager.formState.errors }}
                                    label='Fin'
                                    name='endTime'
                                    type='time'
                                />
                            </div>

                            <div className='d-flex justify-content-between gap-2'>
                                {
                                    idWorktime
                                    ? <>
                                        <Button
                                            className='btn-outline-danger'
                                            Icon={TrashIcon}
                                            text='Eliminar'
                                            handleOnClick={() => formManager.handleDelete(idWorktime)}
                                        />
                                    </>
                                    : <div></div>
                                }
                                <Button
                                    className='btn-outline-success'
                                    Icon={CheckIcon}
                                    text='Guardar'
                                    handleOnClick={formManager.handleSubmit}
                                />
                            </div>
                        </div>

                    </div>
                </ModalTemplate>
            }
        </>
    )
}

export default WorktimeModal