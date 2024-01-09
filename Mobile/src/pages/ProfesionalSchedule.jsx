import { View } from 'react-native'
import { styles } from '../styles'
import { useDate, useEventModal, useModal, useProfesionalEvents } from '../hooks'
import { getEndDate, getStartDate } from '../constants/timeFunctions'
import { ButtonIcon, Calendar, Container, EventModal, Navbar, Reminders, ScheduleDate } from '../components'
import { useSettingsContext } from '../providers/SettingsProvider'
import { CalendarDaysIcon, ClockIcon } from 'react-native-heroicons/outline'
import SchedulePanel from '../components/SchedulePanel'
import { useState } from 'react'

const Schedule = ({ route }) => {
    const { timeZone } = useSettingsContext()
    const { data: profesional } = route.params
    const { date, goToDate, goToPrevDate, goToNextDate } = useDate()
    const { show, handleOpen, handleClose } = useModal()
    const { isLoading, events } = useProfesionalEvents(profesional.id, date)
    const { show: showEventModal, handleOpen: handleOpenEventModal, handleClose: handleCloseEventModal, data } = useEventModal()
    const worktimes = []
    const format24 = false
    const dateStart = getStartDate(date, worktimes, format24, timeZone)
    const dateEnd = getEndDate(date, worktimes, format24, timeZone)
    const [mode, setMode] = useState(false)

    const toggleMode = () => {
        setMode(m => !m)
    }

    const groupsEvents = { normal: [], reminders: [] }
    events.forEach(event => {
        if (event.type === 'reminder') {
            groupsEvents.reminders.push(event)
        } else {
            groupsEvents.normal.push(event)
        }
    })

    const handleDate = (date) => {
        goToDate(date)
        handleClose()
    }

    return (
        <Container>
            <Navbar
                title={`${profesional.surnames} ${profesional.names}`}
                before={
                    <ButtonIcon
                        Icon={ClockIcon}
                        handleOnPress={toggleMode}
                        style={styles.button}
                        stylePressed={styles.buttonPressed}
                        iconStyle={{ ...styles.buttonText, size: 24 }}
                        iconStylePressed={styles.buttonTextPressed}
                        isActived={mode}
                    />
                }
            >
                <ButtonIcon
                    Icon={CalendarDaysIcon}
                    handleOnPress={handleOpen}
                    style={styles.button}
                    stylePressed={styles.buttonPressed}
                    iconStyle={{ ...styles.buttonText, size: 24 }}
                    iconStylePressed={styles.buttonTextPressed}
                />
            </Navbar>
            <View>

                <View style={[styles.schedule, { paddingHorizontal: 16, gap: 16 }]}>
                    <SchedulePanel currentDate={date} handlePrevDate={goToPrevDate} handleNextDate={goToNextDate} handleEventModal={handleOpenEventModal}/>
                    {
                        mode
                        ? <>
                            <Reminders events={groupsEvents} handleEventModal={handleOpenEventModal}/>
                        </>
                        : <>
                             <ScheduleDate
                                startDate={dateStart}
                                endDate={dateEnd}
                                isLoading={isLoading}
                                events={groupsEvents}
                                handleEventModal={handleOpenEventModal}
                            />
                        </>
                    }
                    <EventModal show={showEventModal} handleClose={handleCloseEventModal} data={data}/>
                </View>

                <Calendar show={show} handleClose={handleClose} handleDateButton={handleDate} currentDate={date}/>
            </View>
        </Container>
    )
}

export default Schedule