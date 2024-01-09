import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button, InputV2, ModalTemplate } from '../basis'
import { MODALMODES } from '../../constants/modal'
import { useSettingsContext } from '../providers/SettingsProvider'

const TreatmentModal = ({ showModal, modalMode, handleClose, formManager }) => {
    const { experimentalMode } = useSettingsContext()

    return (
        <ModalTemplate title='Tratamiento' show={showModal} handleClose={handleClose}>
            <div className='d-flex flex-column gap-3'>

                {
                    modalMode === MODALMODES.Delete &&
                    <div>¿Seguro que desea eliminar este tratamiento?</div>
                }

                <div>
                    <InputV2
                        formManager={formManager}
                        label='Descripción'
                        name='description'
                        type='text'
                        placeholder='Ingrese una descripción...'
                        disabled={modalMode === MODALMODES.Delete}
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
                            disabled={modalMode === MODALMODES.Delete}
                        />
                    </div>
                }

                <div className='d-flex gap-2 justify-content-end'>
                    <Button
                        className='btn-outline-success'
                        Icon={CheckIcon}
                        text={modalMode === MODALMODES.Delete ? 'Confirmar' : 'Guardar'}
                        handleOnClick={formManager.handleSubmit}
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
    )
}

export default TreatmentModal