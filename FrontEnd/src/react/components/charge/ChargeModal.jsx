import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button, InputV2, ModalTemplate } from '../basis'
import { MODALMODES } from '../../constants/modal'

const ChargeModal = ({showModal, modalMode, handleClose, formManager }) => {
    return (
        <ModalTemplate title='Cargo' show={showModal} handleClose={handleClose}>
            <div className='d-flex flex-column gap-3'>
                {
                    modalMode === MODALMODES.Delete &&
                    <div>
                        ¿Seguro que desea eliminar este cargo?
                    </div>
                }
                <div className='row'>
                    <InputV2
                        formManager={formManager}
                        label='Descripción'
                        name='description'
                        type='text'
                        placeholder='Descripción del cargo...'
                        disabled={modalMode === MODALMODES.Delete}
                    />
                </div>

                <div className='d-flex justify-content-end gap-2'>
                    <Button
                        className='btn-outline-success'
                        text={modalMode === MODALMODES.Delete ? 'Confirmar' : 'Guardar'}
                        Icon={CheckIcon}
                        handleOnClick={formManager.handleSubmit}
                    />

                    <Button
                        className='btn-outline-system'
                        text='Cancelar'
                        Icon={XMarkIcon}
                        handleOnClick={handleClose}
                    />
                </div>
            </div>
        </ModalTemplate>
    )
}

export default ChargeModal