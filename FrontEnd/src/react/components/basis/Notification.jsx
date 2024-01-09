import { useEffect, useState } from 'react'

const background = {
    primary: 'text-bg-primary',
    secondary: 'text-bg-secondary',
    success: 'text-bg-success',
    danger: 'text-bg-danger',
    warning: 'text-bg-warning',
    info: 'text-bg-info',
    light: 'text-bg-light',
    dark: 'text-bg-dark',
}

const Notification = ({ message, type }) => {
    const [show, setShow] = useState(true)
    const [showing, setShowing] = useState(true)

    const handleClose = () => {
        setShow(false)
    }

    useEffect(() => {
        if (showing) {
            setTimeout(() => setShowing(false), 500)
        } else {
            setTimeout(handleClose, 5000)
        }
    }, [showing])

    return (
        <div className={`toast fade ${show ? 'show' : 'hide'} ${showing ? 'showing' : ''} align-items-center ${background[type]} border-0`}>
            <div className="d-flex">
                <div className="toast-body">{message}</div>
                <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={handleClose}></button>
            </div>
        </div>
    )
}

export default Notification