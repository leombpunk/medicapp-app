import { XMarkIcon } from '@heroicons/react/24/solid';
import Modal from 'react-bootstrap/Modal'

const ModalAlert = ({ title, children, show, loading, handleClose, handleConfirm }) => {
    return (
        <Modal show={show} onHide={handleClose} centered size={'lg'} bg='danger'>
            <Modal.Body>

                <div className='mb-4 d-flex align-items-center justify-content-between'>
                    <h4>{title}</h4>
                    <button className='btn btn-outline-secondary' style={{ borderRadius: '50%', padding: '6px' }} onClick={handleClose}>
                        <XMarkIcon style={{ width: '1.5rem', height: '1.5rem' }}/>
                    </button>
                </div>

                {children}

                <div className='d-flex justify-content-end gap-2'>
                    <button className='btn btn-secondary' onClick={handleClose}>Cancelar</button>
                    <button className='btn btn-danger d-flex gap-2 align-items-center' onClick={handleConfirm} disabled={loading}>
                        Confirmar
                        <div className='spinner-border' style={{width: '1rem', height: '1rem', borderWidth: '2px', display: loading ? 'inherit' : 'none'}}/>
                    </button>
                </div>

            </Modal.Body>
        </Modal>
    )
}

export default ModalAlert