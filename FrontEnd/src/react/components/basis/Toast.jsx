import { UserIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react"

/*
const alertSound = new Audio('../../assets/sounds/alert.wav')
alertSound.autoplay = true

const source = '../../assets/sounds/alert.wav'
const audio = document.createElement('audio')
audio.autoplay = true;
audio.load()
*/

const Toast = () => {
    const [show, setShow] = useState(false)

    const showing = () => {
        setShow(true)
        //audio.src = source
        //audio.play()
        //alertSound.play()
    }

    useEffect(() => {
        setTimeout(showing, 1000)
    }, [])

    return (
        <div className={`toast fade ${show ? 'show' : 'hide' }`}>
            <div className='toast-header bg-primary'>
                <div className='me-auto d-flex align-items-center gap-1 text-light'>
                    <strong>Agenda de Masanet Alejandro</strong>
                </div>
                {/*<small>11 mins ago</small>*/}
                <button type='button' className='btn-close' onClick={() => setShow(false)}></button>
            </div>
            <div className='toast-body'>
                <div className='me-auto d-flex align-items-center gap-1'>
                    <UserIcon style={{ width: '1rem', height: '1rem' }}/>
                    <strong>Neruda Pablo</strong>
                </div>
                <div>08:00 hs</div>
                <div>Consulta</div>
            </div>
        </div>
    )
}

export default Toast