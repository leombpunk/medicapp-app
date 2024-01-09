import { CalendarDaysIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { getStringDateInTimeZone, getStringTimeInTimeZone, monthES } from '../../constants/constants'
import { PASTEL_COLORS } from '../../constants/eventColors'
import { useSettingsContext } from '../providers/SettingsProvider'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import { RoutesNavigation } from '../../constants/RoutesNavigation'

const TurnItem = ({ data }) => {
    const { isThemeDark, timeZone } = useSettingsContext()
    const navigate = useNavigate()
    const date = new Date(data.dateTime)
    return (
        <div className='card d-flex flex-row p-0'>
            <div
                className={`d-flex flex-column justify-content-center align-items-center py-2 ${isThemeDark ? 'text-light' : 'text-dark'}`}
                style={{ borderTopLeftRadius: 'inherit', borderBottomLeftRadius: 'inherit', width: '100px', backgroundColor: `${PASTEL_COLORS[date.getDate() % PASTEL_COLORS.length]}90` }}
            >
                <div className='fs-3 fw-bold'>{date.getUTCDate()}</div>
                <div className='fs-5 fw-bolder text-uppercase'>{monthES[date.getUTCMonth()].slice(0, 3)}</div>
                <div className='fs-6'>{date.getUTCFullYear()}</div>
            </div>

            <div className='border-start flex-grow-1 p-2'>
                <small className=''>{`${getStringTimeInTimeZone(date, timeZone)} hs`}</small>
                <h5>{`${data.profesional.surnames} ${data.profesional.names}`}</h5>
                <div>{`${data.patient.surnames} ${data.patient.names}`}</div>
                <div className='d-flex gap-2 align-items-end'>
                {
                    data.treatment &&
                    <div>{data.treatment.description}</div>
                }
                    <small><i>{data.description}</i></small>
                </div>
            </div>
            <div className='d-flex p-2 align-items-end'>
                <div>
                    <Button
                        className='btn-outline-system'
                        Icon={CalendarDaysIcon}
                        text='Ver en agenda'
                        handleOnClick={() => navigate(`${RoutesNavigation.Profesionals}/${data.profesional.id}/schedule?date=${getStringDateInTimeZone(date, timeZone)}`)}
                    />
                </div>
            </div>
            {
                data.status === 1 &&
                <div className='d-flex justify-content-center align-items-center p-2 border-start'>
                    <CheckCircleIcon style={{ width: '1.5rem', height: '1.5rem' }}/>
                </div>
            }
        </div>
    )
}

const TurnsList = ({ data }) => {
    
    return (
        <div className='d-flex flex-column gap-3'>
            {
                data.length
                ? <>
                    {data.map(turn => <TurnItem key={turn.id} data={turn}/>)}
                </>
                : <>
                    <div className='flex-grow-1 d-flex justify-content-center align-items-center border rounded-2 p-2'>
                        <div>No se han encontrado resultados.</div>
                    </div>
                </>
            }
        </div>
    )
}

export default TurnsList