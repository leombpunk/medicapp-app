import { getStringDateInLanguageTimeZone, getStringTimeInTimeZone } from '../../constants/constants'
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/solid'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { useSettingsContext } from '../providers/SettingsProvider'
import { COLORS } from '../../constants/eventColors'

function EventTurn({ data, handleModal }) {
    const { timeZone } = useSettingsContext()
    const startTime = getStringTimeInTimeZone(new Date(data.startTime), timeZone)
    const endTime   = getStringTimeInTimeZone(new Date(data.endTime), timeZone)
    const startDate = getStringDateInLanguageTimeZone(new Date(data.startTime), 'es-ES', timeZone)
    const endDate = getStringDateInLanguageTimeZone(new Date(data.endTime), 'es-ES', timeZone)
    const isException = data.type === 'exception'
    const isConfirmed = data.status === 1

    return (
        <>
            <button
                className={`border-0 flex-grow-1 rounded-2 p-0 m-2 text-white ${isException ? 'pattern2' : '' }`}
                style={{ backgroundColor: COLORS[data.id % COLORS.length], textAlign: 'inherit', opacity: isConfirmed ? '0.5' : '1' }}
                onClick={() => handleModal(data)}
            >
                <div className='d-flex h-100'>
                    <div className='d-flex justify-content-center align-items-center p-2 border-end border-light'>
                        {
                            isException
                            ? <LockClosedIcon style={{ width: '1.5rem', height: '1.5rem' }}/>
                            : <UserIcon style={{ width: '1.5rem', height: '1.5rem' }}/>
                        }
                    </div>

                    <div className='d-flex flex-grow-1 justify-content-between p-2'>
                        <div className='d-flex flex-column flex-wrap'>
                            <div>{isException ? `${startDate} ${startTime} hs - ${endDate} ${endTime} hs` : `${startTime} hs - ${endTime} hs`}</div>
                            {
                                data.patient &&
                                <div className='fw-bold' style={{ fontSize: '1.25rem' }}>
                                    <div>{`${data.patient.surnames} ${data.patient.names}`}</div>
                                </div>
                            }
                            {
                                data.description &&
                                <div>{data.description}</div>
                            }                 
                        </div>
                    </div>

                    {
                        isConfirmed &&
                        <div className='d-flex justify-content-center align-items-center p-2 border-start border-light'>
                            <CheckCircleIcon style={{ width: '1.5rem', height: '1.5rem' }}/>
                        </div>
                    }
                </div>
            </button>
        </>
    )
}

export default EventTurn