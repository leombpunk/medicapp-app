import { XMarkIcon } from '@heroicons/react/24/outline'
//import Modal from 'react-bootstrap/Modal'

const ModalTemplate = ({ title, children, show, handleClose, contentStyle, modalSize }) => {
    return (
        /*
        <Modal show={show} onHide={handleClose} centered size={size}>
            <Modal.Body>
                <div className='mb-4 d-flex align-items-center justify-content-between'>
                    <h4>{title}</h4>
                    <button className='btn btn-outline-secondary' style={{ borderRadius: '50%', padding: '6px' }} onClick={handleClose}>
                        <XMarkIcon style={{ width: '1.5rem', height: '1.5rem' }}/>
                    </button>
                </div>
                <div>
                    {children}
                </div>
            </Modal.Body>
        </Modal>
        */
        <>
            {
                show && 
                <>
                    <div className='fade modal-backdrop show'></div>
                    <div className='fade modal show d-block' tabIndex='-1'>
                        <div role='dialog' className={`modal-dialog modal-dialog-centered ${modalSize}`}>
                            <div className='modal-content' style={contentStyle}>
                                <div className='modal-body'>
                                    <div className='mb-3 d-flex align-items-center justify-content-between'>
                                        <h4>{title}</h4>
                                            <button
                                                className='btn btn-outline-system rounded-circle d-flex justify-content-center align-items-center p-0'
                                                style={{ width: '40px', height: '40px' }}
                                                onClick={handleClose}
                                            >
                                                <XMarkIcon style={{ width: '1.5rem', height: '1.5rem' }}/>
                                            </button>
                                    </div>
                                    <div>
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default ModalTemplate