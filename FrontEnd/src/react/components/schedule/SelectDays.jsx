import { dayES } from '../../constants/constants'

function SelectDays({workdays, handleToggleDay}) {
    return (
        <div>
            <div className='d-flex justify-content-center gap-2'>
                {workdays.map(day => 
                    <div key={day.idDay}>
                        <button 
                            className={`btn button-96 ${day.enabled ? 'btn-dark' : 'btn-outline-dark'}`}
                            onClick={() => handleToggleDay(day.idDay)}
                            style={{minWidth: '8rem'}}
                        >
                            {dayES[day.idDay]}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SelectDays