import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button, ModalTemplate } from '../basis'

const TurnOffUserModal = ({ show, handleClose, handleConfirm, isLoading, user }) => {
    if (user?.isDeleted) {
        return (
            <ModalTemplate title='Suspender' show={show} handleClose={handleClose}>
                <div className='d-flex flex-column gap-3'>
                    <div>
                        ¿Confirma que desea reactivar esta cuenta?
                    </div>
                    <div className='d-flex flex-row justify-content-end gap-2'>
                        <Button
                            className='btn-outline-success'
                            Icon={CheckIcon}
                            text='Confirmar'
                            handleOnClick={handleConfirm}
                            isLoading={isLoading}
                            isDisabled={isLoading}
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

    return (
        <ModalTemplate title='Suspender' show={show} handleClose={handleClose}>
            <div className='d-flex flex-column gap-3'>
                <div>
                    Suspender la cuenta inhabilitara el inicio de sesión para esta cuenta.
                </div>
                <div>
                    ¿Seguro que desea continuar?
                </div>
                <div className='d-flex flex-row justify-content-end gap-2'>
                    <Button
                        className='btn-outline-success'
                        Icon={CheckIcon}
                        text='Confirmar'
                        handleOnClick={handleConfirm}
                        isLoading={isLoading}
                        isDisabled={isLoading}
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

export default TurnOffUserModal