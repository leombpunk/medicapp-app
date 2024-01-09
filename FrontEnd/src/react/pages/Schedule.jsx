import { useParams, useSearchParams } from 'react-router-dom'
import useProfesional from '../components/hooks/useProfesional'
import { Loading, Title } from '../components/basis'
import ScheduleController from '../components/schedule/ScheduleController'
import NotFoundPage from './NotFound'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'

const Schedule = () => {
    const params = useParams()
    const [query] = useSearchParams()
    const { loading, profesional } = useProfesional(params.id)

    return (
        <>
            {
                loading
                ? <Loading/>
                : profesional
                    ?   <div className='d-flex flex-column gap-3'>
                            <Title Icon={CalendarDaysIcon} text={`Agenda de ${profesional.surnames} ${profesional.names}`}/>
                            <ScheduleController
                                profesional={profesional}
                                workdays={profesional.workdays}
                                worktimes={profesional.worktimes}
                                initialDate={query.get('date')}
                            />
                        </div>
                    : <NotFoundPage/>
            }
        </>
    )
}

export default Schedule
