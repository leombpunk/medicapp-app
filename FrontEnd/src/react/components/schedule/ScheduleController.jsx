import ScheduleDate from './ScheduleDate'
import ScheduleCalendar from './ScheduleCalendar'
import SchedulePanel from './SchedulePanel'
import useDate from '../hooks/useDate'
import useProfesionalEvents from '../hooks/useProfesionalEvents'
import EventsModal from './EventsModal'
import { useScheduleContext } from '../providers/ScheduleProvider'
import { useSettingsContext } from '../providers/SettingsProvider'
import { useState } from 'react'
import EventPreview from './EventPreview'
import { Cog6ToothIcon } from '@heroicons/react/24/solid'
import { MODALMODES, MODALTABS } from '../../constants/modal'
import { UTC, getStringDateInTimeZone } from '../../constants/constants'
import { Button } from '../basis'
import { useNavigate } from 'react-router-dom'
import { RoutesNavigation } from '../../constants/RoutesNavigation'
import { useUserContext } from '../providers/UserProvider'
import { USER_ROLES } from '../../constants/roles'

function ScheduleController({ profesional, initialDate }) {
    const navigate = useNavigate()
    const { user } = useUserContext()
    const { timeZone, format24, toggleFormat, showTurns, toggleShowTurns, showExceptions, toggleShowExceptions } = useSettingsContext()
    const { date, goToDate, goToPrevDate, goToNextDate } = useDate(initialDate)
    const { events, operations } = useProfesionalEvents(profesional.id, date)
    const { handleModalOpen: handleEventModalOpen, setOperations } = useScheduleContext()
    const [showEventModal, setShowEventModal] = useState(false)
    const [dataEventModal, setDataEventModal] = useState({})
    const [mode, setMode] = useState(false)
    setOperations(operations)

    const canModify = !profesional.isDeleted && (user.role.id === USER_ROLES.Admin || user.id === profesional.id)

    const setModeToReminders = () => {
        setMode(true)
    }
    
    const setModeToTurns = () => {
        setMode(false)
    }

    const handleOpenEventModal = (data) => {
        setDataEventModal(data)
        setShowEventModal(true)
    }

    const goToConfigurationPage = () => {
        const URL = `${RoutesNavigation.ScheduleSettings}/${profesional.id}`
        navigate(URL)
    }

    return (
        <>
            <div className='flex-grow-1 d-flex gap-3' style={{ maxHeight: 'calc(100vh - 3rem - 1.5rem - 36px)', height: 'calc(100vh - 3rem - 1.5rem - 36px)' }}>

                <div className='d-flex flex-column gap-3' style={{ maxWidth: '33%' }}>
                    
                    <ScheduleCalendar currentDate={date} goToDate={goToDate}/>
                    {
                        !profesional.worktimes.length
                        ? canModify && 
                            <>
                                <Button
                                    className='btn-outline-system'
                                    Icon={Cog6ToothIcon}
                                    text='Configuración'
                                    handleOnClick={goToConfigurationPage}
                                />

                                <div className='alert alert-warning m-0'>
                                    <h5>¡Atención!</h5>
                                    <div>Este profesional no tiene ninguna franja horaria configurada en su agenda.</div>
                                    <div>Diríjase a <b>Configuración</b> para establecerla.</div>
                                </div>
                            </>
                        : <>
                            <div className='d-flex gap-2'>
                                {
                                    canModify &&
                                    <>
                                        <Button
                                            className='btn-outline-primary flex-grow-1' text='Añadir Evento'
                                            handleOnClick={() => handleEventModalOpen(MODALTABS.Turns, MODALMODES.Add, { date: getStringDateInTimeZone(date, UTC) })}
                                        />

                                        <Button
                                            className='btn-outline-system'
                                            Icon={Cog6ToothIcon}
                                            text='Configuración'
                                            handleOnClick={goToConfigurationPage}
                                        />

                                        <EventsModal profesional={profesional}/>
                                    </>
                                }

                                <EventPreview
                                    modalShow={showEventModal}
                                    handleModalClose={() => setShowEventModal(false)}
                                    data={dataEventModal}
                                    handleConfirmTurn={operations.turns.confirm}
                                    handleEventModal={handleEventModalOpen}
                                    canModify={canModify}
                                />
                            </div>

                            <div className='alert alert-secondary m-0'>
                                {timeZone.description}
                            </div>

                            <div className='d-flex flex-column gap-2'>
                                <h5> Mostrar </h5>

                                <div className='form-check form-switch'>
                                    <input id='format24Checkbox' className='form-check-input' type='checkbox' checked={format24} onChange={toggleFormat}/>
                                    <label htmlFor='format24Checkbox' className='form-check-label'> 24 hs </label>
                                </div>

                                <div className='form-check form-switch'>
                                    <input id='turnsCheckbox' className='form-check-input' type='checkbox' checked={showTurns} onChange={toggleShowTurns}/>
                                    <label htmlFor='turnsCheckbox' className='form-check-label'> Turnos </label>
                                </div>

                                <div className='form-check form-switch'>
                                    <input id='exceptionsCheckbox' className='form-check-input' type='checkbox' checked={showExceptions} onChange={toggleShowExceptions}/>
                                    <label htmlFor='exceptionsCheckbox' className='form-check-label'> Excepciones </label>
                                </div>

                            </div>
                        </>
                    }
                </div>

                <div className='border rounded d-flex flex-column flex-grow-1 overflow-hidden'>
                    <SchedulePanel
                        currentDate={date}
                        handlePrevDate={goToPrevDate}
                        handleNextDate={goToNextDate}
                        currentMode={mode}
                        handleTurnsMode={setModeToTurns}
                        handleRemindersMode={setModeToReminders}
                    />
                    <ScheduleDate
                        currentMode={mode}
                        handleEventsModalOpen={handleEventModalOpen}
                        handlePreviewModalOpen={handleOpenEventModal}
                        date={date}
                        worktimes={profesional.worktimes.filter(worktime => worktime.idDay === date.getUTCDay())}
                        events={events}
                        showTurns={showTurns}
                        showExceptions={showExceptions}
                        canModify={canModify}
                    />
                </div>
                
            </div>
        </>
    )
}

export default ScheduleController