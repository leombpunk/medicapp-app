import { CalendarDaysIcon } from '@heroicons/react/24/solid'
import { COLORS } from '../../constants/eventColors'
import { useSettingsContext } from '../providers/SettingsProvider'
import { getStringTimeInTimeZone } from '../../constants/constants'

function EventReminder({ data, handleModal }) {
    const { timeZone } = useSettingsContext()
    const time = getStringTimeInTimeZone(new Date(data.dateTime), timeZone)

    return (
        <>
            <button
                className='border-0 p-0 rounded-2 text-white'
                style={{ backgroundColor: COLORS[data.id % COLORS.length], minHeight: '16px', textAlign: 'inherit' }}
                onClick={() => handleModal(data)}
            >
                <div className='d-flex'>
                    <div className='d-flex justify-content-center align-items-center p-2 border-end border-light'>
                        <CalendarDaysIcon style={{ width: '1.5rem', height: '1.5rem' }}/>
                    </div>
                    
                    <div className='d-flex flex-grow-1 justify-content-between p-2'>
                        <div className='d-flex flex-column'>
                            {data.patient && <div className='fw-bold' style={{ fontSize: '1.25rem' }}>{`${data.patient.surnames} ${data.patient.names}`}</div>}
                            <div>{`${time} hs`}</div>
                            <div className='text-break'>{data.description}</div>                     
                        </div>
                    </div>
                </div>
            </button>
        </>
    )
}

export default EventReminder