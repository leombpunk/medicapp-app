import { useNavigate, useParams } from 'react-router-dom'
import { Loading, Title, Button } from '../components/basis'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import { ArrowUturnLeftIcon, CheckIcon, PlusIcon } from '@heroicons/react/24/solid'
import { dayES } from '../constants/constants'
import { useProfesional, useWorktimeModal } from '../components/hooks'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import WorktimeModal from '../components/scheduleSetting/WorktimeModal'
import NotFound from './NotFound'
import { USER_ROLES } from '../constants/roles'
import { useUserContext } from '../components/providers/UserProvider'

const WorktimeItem = ({ data, handleOnClick }) => {
    return (
        <button className='p-0 card' onClick={handleOnClick}>
            <div className='card-footer border-0'>
                <div className='d-flex'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Inicio</th>
                                <td></td>
                                <td>{data.startTime.slice(0, 5)} hs</td>
                            </tr>
                            <tr>
                                <th>Fin</th>
                                <td></td>
                                <td>{data.endTime.slice(0, 5)} hs</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </button>
    )
}

const ScheduleSetting = () => {
    const navigate = useNavigate()
    const { user } = useUserContext()
    const { idProfesional }= useParams()
    const { isThemeDark } = useSettingsContext()
    const { loading, profesional, updateWorktimes, saveScheduleConfig } = useProfesional(idProfesional)
    const { show, handleOpen, handleClose, worktimeForm } = useWorktimeModal(profesional, updateWorktimes)

    const canModify = !profesional?.isDeleted && (user.role.id === USER_ROLES.Admin || user.id === profesional?.id)

    return (
        <>
            {
                loading
                ? <div className='h-100 d-flex justify-content-center align-items-center'>
                    <Loading/>
                </div>
                : profesional
                ? <>
                    <div className='d-flex flex-column gap-3'>

                        <Title Icon={CalendarDaysIcon} text={profesional ? `Agenda de ${profesional.surnames} ${profesional.names}` : 'Agenda'}>
                            <div className='d-flex gap-2'>
                                <Button
                                    Icon={ArrowUturnLeftIcon}
                                    className='btn-outline-system'
                                    text='Volver'
                                    handleOnClick={() => navigate(-1)}
                                />
                            </div>
                        </Title>

                        <div className='d-flex flex-column'>
                            {
                                dayES.map((day, dayIndex) =>
                                    <div className={`d-flex align-items-center ${dayIndex !== dayES.length - 1 && 'border-bottom'} gap-5`} key={dayIndex} style={{ height: '6.5rem'}}>
                                        <div className='d-flex justify-content-end text-capitalize' style={{ width: '6rem' }}>{day}</div>
                                        <div className='d-flex align-items-center gap-3'>
                                            {
                                                profesional?.worktimes.filter(worktime => worktime.idDay === dayIndex).sort((a, b) => a.startTime > b.startTime ? 1 : -1).map(worktime => 
                                                    <WorktimeItem key={worktime.id} data={worktime} handleOnClick={() => handleOpen(worktime)}/>
                                                )
                                            }
                                            <Button
                                                className={isThemeDark ? 'btn-outline-light' : 'btn-outline-dark'}
                                                Icon={PlusIcon}
                                                text='Añadir'
                                                handleOnClick={() => handleOpen({ idDay: dayIndex })}
                                            />
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                        {
                            canModify &&
                            <>
                                <div className='d-flex justify-content-end'>
                                    <Button
                                        className='btn-outline-success'
                                        text='Guardar'
                                        Icon={CheckIcon}
                                        handleOnClick={saveScheduleConfig}
                                    />
                                </div>

                                <WorktimeModal modalShow={show} handleClose={handleClose} formManager={worktimeForm}/>
                            </>
                        }
                    </div>
                </>
                : <div className='flex-grow-1 d-flex justify-content-center align-items-center'>
                    <NotFound/>
                </div>
            }
        </>
    )
}

export default ScheduleSetting