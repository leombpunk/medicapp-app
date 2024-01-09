import { ArrowSmallLeftIcon, ArrowSmallRightIcon } from '@heroicons/react/24/solid'
import { dayES, getStringDateInLanguageTimeZone, getStringDateInTimeZone, getStringTimeInTimeZone } from '../../../constants/constants'
import useDate from '../../hooks/useDate'
import { isTheSameDate, getWeeksInMonth, getMonthsInYear } from '../../../constants/functions'
import { useSettingsContext } from '../../providers/SettingsProvider'

const getRowTimes = (start, end) => {
    const results = []
    const current = new Date(start.toISOString())
    results.push(new Date(current.toISOString()))

    while (current < end) {
        current.setMinutes(current.getMinutes() + 30)
        results.push(new Date(current.toISOString()))
        current.setMinutes(current.getMinutes() + 30)
        results.push(new Date(current.toISOString()))
    }

    return results
}

const YearView = ({ year, currentDate, handleDate}) => {
    return (
        <div className='card-body d-flex flex-wrap justify-content-around gap-3' style={{ overflow: 'auto' }}>
            {
                getMonthsInYear(year).map((month) =>
                    <div key={month.getMonth()}>
                        <h4>{month.toLocaleString('es-ES', { month: 'long' })}</h4>

                        <div className='card' style={{ width: '350px', height: '282px'}}>
                            <div className='d-flex justify-content-around'>
                                {dayES.map((day, index)=> <div key={index} className='calendar-day'>{day.charAt(0)}</div>)}
                            </div>
                            {
                                getWeeksInMonth(year, month.getMonth()).map((week, index) => 
                                    <div className='d-flex justify-content-around' key={index}>
                                        {
                                            week.map((dateMonth, weekIndex) => 
                                                <div
                                                    key={weekIndex}
                                                    className={`calendar-day calendar-day-button ${isTheSameDate(currentDate, dateMonth) && dateMonth.getMonth() === month.getMonth() && 'calendar-selected-date' }`}
                                                    //className={`calendar-day calendar-date-button ${isTheSameDate(date, dateMonth) ? 'calendar-selected-date' : month.getMonth() !== dateMonth.getMonth() ? 'text-secondary' : null}`}
                                                    onClick={() => handleDate(dateMonth)}
                                                >
                                                    {dateMonth.getDate()}
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

const WeekView = ({ currentDate }) => {
    const { timeZone } = useSettingsContext()

    const day = getStringDateInTimeZone(currentDate, timeZone)
    const startTime = new Date(`${day}T00:00:00${timeZone.numeric}`)
    const endTime = new Date(`${day}T23:59:00${timeZone.numeric}`) 

    const rows = getRowTimes(startTime, endTime)

    return (
        <>
            <table className='table table-overflow table-striped'>
                <thead>
                    <tr>
                        <th className='text-center'>Hora</th>
                        <th className='text-center'>Domingo</th>
                        <th className='text-center'>Lunes</th>
                        <th className='text-center'>Martes</th>
                        <th className='text-center'>Miercoles</th>
                        <th className='text-center'>Jueves</th>
                        <th className='text-center'>Viernes</th>
                        <th className='text-center'>Sabado</th>
                    </tr>
                </thead>
                <tbody style={{ maxHeight: 'calc(100vh - 3rem - 6.1rem)', overflow: 'auto' }}>
                    {
                        rows.map((dateTime, index) => {
                            const time = getStringTimeInTimeZone(dateTime, timeZone)
                            return (
                                <tr key={index}>
                                    <td>{time}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            )
                        })
                    }          
                </tbody>
            </table>
        </>
    )
}

const Calendar = () => {
    const { date, goToDate, goToPrevDate, goToNextDate } = useDate()
    const { timeZone } = useSettingsContext()

    return (
        <div className='mx-4'>
        <div className='d-flex flex-wrap border rounded-2' style={{ height: 'calc(100vh - 3rem)' }}>
            <div className='w-100 py-2 px-2 text-bg-light'>
                <div className='d-flex justify-content-between align-items-center'>
                    <h4>{getStringDateInLanguageTimeZone(date, 'es-ES', timeZone)}</h4>

                    <div className='d-flex gap-2'>
                        <button
                            className='btn btn-outline-secondary rounded-circle d-flex justify-content-center align-items-center'
                            style={{padding: '0', width: '2.5rem', height: '2.5rem'}}
                            onClick={goToPrevDate}
                        >
                            <ArrowSmallLeftIcon style={{width: '1.5rem', height:'1.5rem'}}/>
                        </button>
                        <button 
                            className='btn btn-outline-secondary rounded-circle d-flex justify-content-center align-items-center'
                            style={{padding: '0', width: '2.5rem', height: '2.5rem'}}
                            onClick={goToNextDate}
                        >
                            <ArrowSmallRightIcon style={{width: '1.5rem', height:'1.5rem'}}/>
                        </button>
                    </div>
                </div>
            </div>
            {/*
            <YearView year={date.getFullYear()} currentDate={date} handleDate={goToDate}/>
            */}
            <WeekView currentDate={date}/>
        </div>
        </div>
    )
}

export default Calendar