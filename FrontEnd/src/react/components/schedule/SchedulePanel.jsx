import { ArrowSmallLeftIcon, ArrowSmallRightIcon } from '@heroicons/react/24/solid'
import { UTC, getStringDateInLanguageTimeZone } from '../../constants/constants'

const buttonStyle = { width: '2.5rem', height: '2.5rem' }
const iconStyle = { width: '1.5rem', height:'1.5rem' }

const SchedulePanel = ({ currentDate, handlePrevDate, handleNextDate, currentMode, handleTurnsMode, handleRemindersMode }) => {
    const isReminderMode = currentMode

    return (
        <>
            <div className='nav nav-tabs d-flex'>
                
                <div className='d-flex flex-row pt-3'>
                    <div className='nav-item ms-2'>
                        <button className={`nav-link ${isReminderMode ? '' : 'active' }`} onClick={handleTurnsMode}>Agenda</button>
                    </div>
                    <div className='nav-item'>
                        <button className={`nav-link ${isReminderMode ? 'active' : '' }`} onClick={handleRemindersMode}>Recordatorios</button>
                    </div>
                </div>

                <div className='d-flex flex-grow-1 justify-content-end gap-3 align-items-center px-3'>
                    <h4>{getStringDateInLanguageTimeZone(currentDate, 'es-ES', UTC)}</h4>

                    <div className='d-flex gap-2'>
                        <button
                            className='btn btn-outline-system rounded-circle p-0'
                            style={buttonStyle}
                            onClick={handlePrevDate}
                        >
                            <div className='d-flex justify-content-center align-items-center'>
                                <ArrowSmallLeftIcon style={iconStyle}/>
                            </div>
                        </button>
                        <button
                            className='btn btn-outline-system rounded-circle p-0'
                            style={buttonStyle}
                            onClick={handleNextDate}
                        >
                            <div className='d-flex justify-content-center align-items-center'>
                                <ArrowSmallRightIcon style={iconStyle}/>
                            </div>
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SchedulePanel