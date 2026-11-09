import { useState } from 'react'
import { Offcanvas } from 'react-bootstrap'
import { Bars3Icon } from '@heroicons/react/24/solid'
import SidebarContent from './SidebarContent'

/**
 * Sidebar para pantallas < lg (992px): botón hamburguesa fijo arriba
 * + Offcanvas con el mismo contenido que la sidebar de escritorio.
 */
const SidebarMobile = () => {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            <div className='d-lg-none d-flex align-items-center border-bottom bg-body px-3 py-2 sticky-top'>
                <button
                    type='button'
                    className='btn sidebar-toggle square-button p-0'
                    onClick={handleShow}
                    aria-label='Abrir menú'
                >
                    <Bars3Icon className='square-button-icon'/>
                </button>
            </div>

            <Offcanvas show={show} onHide={handleClose} placement='start'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>MedicApp</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='px-3'>
                    <SidebarContent onNavigate={handleClose}/>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default SidebarMobile
