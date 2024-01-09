import { ArrowSmallLeftIcon, ArrowSmallRightIcon } from '@heroicons/react/24/solid'
import { UTC, dayES, getStringDateInTimeZone } from '../../constants/constants'
import { isTheSameDate, getWeeksInMonth } from '../../constants/functions'
import useDate from '../hooks/useDate'
import { useSettingsContext } from '../providers/SettingsProvider'

const buttonStyle = { width: '2.5rem', height: '2.5rem' }
const iconStyle = { width: '1.5rem', height:'1.5rem' }
function ScheduleCalendar({ currentDate, goToDate }) {
    const { timeZone } = useSettingsContext()
    const { date, goToPrevMonth, goToNextMonth } = useDate(getStringDateInTimeZone(currentDate, UTC))

    return (
        <div className='d-flex flex-column'>
            <div className='d-flex justify-content-between align-items-center m-2'>
                <h4>{date.toLocaleString('es-ES', { year: 'numeric', month: 'long', timeZone: UTC.string })}</h4>

                <div className='d-flex gap-2'>
                    <button 
                        className='btn btn-outline-system rounded-circle d-flex justify-content-center align-items-center p-0'
                        style={buttonStyle}
                        onClick={goToPrevMonth}
                    >
                        <ArrowSmallLeftIcon style={iconStyle}/>
                    </button>
                    <button 
                        className='btn btn-outline-system rounded-circle d-flex justify-content-center align-items-center p-0'
                        style={buttonStyle}
                        onClick={goToNextMonth}
                    >
                        <ArrowSmallRightIcon style={iconStyle}/>
                    </button>
                </div>
            </div>

            <div className='card p-2' style={{ height: '298px', minWidth: '350px' }}>
                <div>
                    <div className='d-flex justify-content-around'>
                        {dayES.map((day, index)=> <div key={index} className='calendar-day'>{day.charAt(0)}</div>)}
                    </div>

                    {
                        getWeeksInMonth(date.getUTCFullYear(), date.getUTCMonth(), timeZone).map((week, index) => 
                            <div className='d-flex justify-content-around' key={index}>
                                {
                                    week.map((dateMonth, wndex) => 
                                        <div
                                            className={`calendar-day calendar-day-button ${isTheSameDate(currentDate, dateMonth, timeZone) ? 'calendar-selected-date' : date.getUTCMonth() !== dateMonth.getUTCMonth() ? 'text-secondary' : null}`}
                                            onClick={() => goToDate(dateMonth)}
                                            key={wndex}
                                        >
                                            {dateMonth.getUTCDate()}
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default ScheduleCalendar