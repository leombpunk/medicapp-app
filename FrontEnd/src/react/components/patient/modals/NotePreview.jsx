import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Button, ModalTemplate } from '../../basis'

const NotePreview = ({ showModal, handleClose, formManager, handleEdit, handleDelete }) => {
    const content = formManager.getValues('content')
    return (
        <ModalTemplate show={showModal} modalSize='modal-lg' handleClose={handleClose} title='Nota'>
            <div className='d-flex flex-column gap-3'>

                <div className='card-body text-truncate' style={{ whiteSpace: 'pre-wrap' }}>
                    {content}
                </div>

                <div className='d-flex justify-content-end gap-2'>
                    <Button
                        className='btn-outline-system'
                        Icon={PencilIcon}
                        text='Editar'
                        handleOnClick={handleEdit}
                    />
                    <Button
                        className='btn-outline-system'
                        Icon={TrashIcon}
                        text='Eliminar'
                        handleOnClick={handleDelete}
                    />
                </div>
                
            </div>
        </ModalTemplate>
    )
}

export default NotePreview