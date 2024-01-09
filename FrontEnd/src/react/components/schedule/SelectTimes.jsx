import { useState } from 'react'
import TimeSlot from '../TimeSlot'
import WorktimeModal from './WorktimeModal'

function SelectTimes({workdays, deleteTimeSlot}) {

    const [worktime, setWorktime] = useState({
        startTime: '00:00',
        endTime: '00:00'
    })

    const [showModal, setShowModal] = useState(false)

    const handleOpenModal = (idDay) => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    return (
        <div>
            <hr></hr>
            <WorktimeModal worktime={worktime} show={showModal} handleClose={handleCloseModal}/>
            <div className='d-flex justify-content-center gap-2'>
                {
                    workdays.map((day, index) =>
                        <div key={index} className='d-flex flex-column gap-2'>
                            {
                                day.enabled 
                                ? <>
                                    {
                                        day.worktimes.map((worktime, index) =>
                                            <TimeSlot
                                                key={index}
                                                dayID={day.idDay}
                                                timeslot={worktime}
                                                deleteTimeSlot={deleteTimeSlot}
                                            />
                                        )
                                    }
                                </>
                                : null
                            }
                            <button className='btn btn-outline-dark' style={{minWidth: '8rem', visibility: day.enabled ? 'inherit' : 'hidden' }} onClick={handleOpenModal}> + </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SelectTimes