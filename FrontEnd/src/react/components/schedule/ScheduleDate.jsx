import { UTC, getStringDateInTimeZone, getStringTimeInTimeZone } from '../../constants/constants'
import { MODALMODES, MODALTABS } from '../../constants/modal'
import { getEventHeight, getEventPositionY, getMaxDateEnd, getMinDateStart, getWorktimesOfDate, isTimeEnabled } from '../../constants/schedule'
import { useSettingsContext } from '../providers/SettingsProvider'
import EventTurn from './EventTurn'
import EventReminder from './EventReminder'

const getRowTimes = (start, end) => {
    const results = []
    const current = new Date(start.toISOString())
    results.push(new Date(current.toISOString()))

    while (new Date(Date.UTC(current.getUTCFullYear(), current.getUTCMonth(), current.getUTCDate(), current.getUTCHours(), current.getUTCMinutes() + 30)) < end) {
        current.setUTCMinutes(current.getUTCMinutes() + 30)
        results.push(new Date(current.toISOString()))
        //current.setUTCMinutes(current.getUTCMinutes() + 30)
        //results.push(new Date(current.toISOString()))
    }
    return results
}

const getStartDate = (date, worktimes, format24, timeZone) => {
    if (format24) {
        const day = getStringDateInTimeZone(date, UTC)
        return new Date(`${day}T00:00:00${timeZone.numeric}`) 
    } else {
        return getMinDateStart(date, worktimes, timeZone)
    }
}

const getEndDate = (date, worktimes, format24, timeZone) => {
    if (format24) {
        const day = getStringDateInTimeZone(date, UTC)
        return new Date(`${day}T23:59:00${timeZone.numeric}`)
    } else {
        return getMaxDateEnd(date, worktimes, timeZone)
    }
}

function ScheduleDate({ date, worktimes, events, handleEventsModalOpen, handlePreviewModalOpen, currentMode, showTurns, showExceptions, canModify }) {
    const { isThemeDark, timeZone, format24 } = useSettingsContext()
    const dateStart = getStartDate(date, worktimes, format24, timeZone)
    const dateEnd = getEndDate(date, worktimes, format24, timeZone)
    const dateWorktimes = getWorktimesOfDate(date, worktimes, timeZone)
    const rowsTimes = getRowTimes(dateStart, dateEnd)
    const rowHeight = 100 / rowsTimes.length

    return (
        <div className='flex-grow-1 overflow-auto'>
            <div className='position-relative'>
                {
                    !currentMode
                    ? <>
                        <div className=''>
                            {
                                rowsTimes.map((datetime, index) => {
                                    const isEnabled = isTimeEnabled(datetime, dateWorktimes)
                                    const date = getStringDateInTimeZone(datetime, timeZone)
                                    const time = getStringTimeInTimeZone(datetime, timeZone)
                                    return (
                                        <div key={index} className={`d-flex schedule-row ${isEnabled ? isThemeDark ? 'text-bg-dark' : 'text-bg-light' : 'daytime-disabled'}`}>
                                            <div className='w-20 align-top text-center'>
                                                {time}
                                            </div>
                                            {
                                                canModify &&
                                                <div
                                                    className={`d-flex justify-content-center w-80 ${isEnabled ? 'hover-clickable' : ''}`}
                                                    onClick={isEnabled ? () => handleEventsModalOpen(MODALTABS.Turns, MODALMODES.Add, { date, time }) : () => {}}
                                                >
                                                    <div className='schedule-new d-flex align-items-center text-bg-primary'>
                                                        <div>
                                                            Añadir turno a las <b>{time} hs</b>
                                                        </div>
                                                    </div>
                                                </div>
                                            }   
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className='event-container'>
                            {
                                showTurns &&
                                events.turn?.map(event =>
                                    <div
                                        key={event.id}
                                        className='d-flex'
                                        style={{
                                            position: 'absolute',
                                            width: '80%',
                                            height: `${rowHeight * 2 * getEventHeight(dateStart, dateEnd, new Date(event.startTime), new Date(event.endTime))}%`,
                                            top: `${rowHeight * 2 * getEventPositionY(dateStart, new Date(event.startTime))}%`,
                                            left: `${20}%`,
                                            zIndex: 2,
                                            pointerEvents: 'initial'
                                        }}
                                    >
                                        <EventTurn
                                            data={event}
                                            handleModal={handlePreviewModalOpen}
                                        />
                                    </div>
                                )
                            }
                            {
                                showExceptions &&
                                events.exception?.map(event =>
                                    <div
                                        key={event.id}
                                        className='d-flex'
                                        style={{
                                            position: 'absolute',
                                            width: '80%',
                                            height: `${rowHeight * 2 * getEventHeight(dateStart, dateEnd, new Date(event.startTime), new Date(event.endTime))}%`,
                                            top: `${rowHeight * 2 * getEventPositionY(dateStart, new Date(event.startTime))}%`,
                                            left: `${20}%`,
                                            zIndex: 2,
                                            pointerEvents: 'initial'
                                        }}
                                    >
                                        <EventTurn
                                            data={event}
                                            handleModal={handlePreviewModalOpen}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </>
                    : <>
                        <div className='d-flex flex-column p-2 gap-2'>
                            {
                                events.reminder?.map(event =>
                                    <EventReminder
                                        key={event.id}
                                        data={event}
                                        handleModal={handlePreviewModalOpen}
                                    />
                                )
                            }
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default ScheduleDate