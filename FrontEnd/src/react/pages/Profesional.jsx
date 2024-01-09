import { useParams } from 'react-router-dom'
import { Button, Loading } from '../components/basis'
import { useProfesional } from '../components/hooks'
import NotFoundPage from './NotFound'
import { ProfesionalData, ProfesionalPatients, ProfesionalTreatments } from '../components/profesional'
import { CalendarDaysIcon, ChartBarIcon } from '@heroicons/react/24/outline'

const Profesional = () => {
    const { id: idProfesional } = useParams()
    const { loading, profesional, goToProfesionalSchedule, goToProfesionalStats } = useProfesional(idProfesional)

    return (
        <>
            {
                loading                    
                ? <Loading/>
                : profesional 
                    ? <div className='container'>
                        <div className='d-grid gap-5' style={{ gridTemplateColumns: '3fr 2fr'}}>
                            <div className='d-flex flex-column gap-4'>
                                <ProfesionalData profesional={profesional}/>

                                <div className='d-flex gap-3'>
                                    <Button className='flex-grow-1 btn-outline-system' Icon={CalendarDaysIcon} text='Agenda' handleOnClick={goToProfesionalSchedule}/>
                                    <Button className='flex-grow-1 btn-outline-system' Icon={ChartBarIcon} text='Estadísticas' handleOnClick={goToProfesionalStats}/>
                                </div>

                                <ProfesionalTreatments profesional={profesional}/>
                            </div>

                            <div>
                                <ProfesionalPatients profesional={profesional}/>
                            </div>
                        </div>
                    </div>
                    : <NotFoundPage/>
            }
        </>
    )
}

export default Profesional