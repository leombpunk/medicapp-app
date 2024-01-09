import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/24/solid'
import { dayES } from '../../constants/constants'
import SelectDays from './SelectDays'
import SelectTimes from './SelectTimes'
import Worktime from './Worktime'

function ScheduleConfiguration({ workdays, addWorktime, editWorktime }) {
    return (
        <>
            <div className='container'>
                <div className='d-flex flex-column gap-4'>
                    <div className='panel'>
                        <div className='d-flex align-items-center justify-content-between'>

                            <div className='d-flex align-items-center gap-1'>
                                <div className='title-icon'>
                                    <Cog6ToothIcon/>                  
                                </div>

                                <div className='title'>
                                    Configuración de la Agenda
                                </div>
                            </div>

                        </div>
                    </div>

                    <div>
                        <h5 className='mb-3'>Selecciona un día y establezca una franja horaria</h5>

                        <div className='d-flex flex-column gap-3'>
                            {
                                workdays.map(workday => 
                                    <div className='d-flex gap-2' key={workday.idDay}>
                                        <div
                                            className='d-flex justify-content-center align-items-center'
                                            style={{ width: '8rem', height: '116px' }}
                                        >
                                            {dayES[workday.idDay]}
                                        </div>
                                        <div className='d-flex justify-content-center align-items-center gap-4'>
                                            {
                                                workday.worktimes.map((worktime, index) =>
                                                    <Worktime key={index} worktime={worktime}/>
                                                )
                                            }
                                            
                                            <div>
                                                <button
                                                    className='btn btn-outline-primary'
                                                    style={{ padding: 0, width: '3rem', height: '3rem' }}
                                                    onClick={null}
                                                >
                                                    <PlusIcon style={{ width: '2rem', height: '2rem' }}/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <div className='d-flex justify-content-end'>
                        <button type='button' className='btn btn-success'>Guardar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScheduleConfiguration