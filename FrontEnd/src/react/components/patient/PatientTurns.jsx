import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import { usePatientTurns } from '../hooks'
import { RoutesNavigation } from '../../constants/RoutesNavigation'
import { Button, Title, TurnsList } from '../basis'
import { useNavigate } from 'react-router-dom'

const PatientTurns = ({ patient }) => {
    const idPatient = patient?.id

    const { isLoading, turns } = usePatientTurns({
        idPatient,
        rows: 5,
        rowOrder: { dateTime: 'ASC' },
        turnStatus: 0
    })
    const navigate = useNavigate()

    return (
        <div className='d-flex flex-column gap-4'>
            <Title Icon={CalendarDaysIcon} text='Próximos turnos'>
                <Button
                    className='btn-outline-system'
                    text='Ver más'
                    handleOnClick={() => navigate(`${RoutesNavigation.Turns}?idPatient=${idPatient}`)}
                />
            </Title>
            <TurnsList data={turns}/>
        </div>
    )
}

export default PatientTurns