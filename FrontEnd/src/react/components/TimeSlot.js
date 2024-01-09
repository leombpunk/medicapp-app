import { PencilIcon, XMarkIcon } from "@heroicons/react/24/solid"

const TimeSlot = ({dayID, timeslot, deleteTimeSlot}) => {

    const startTime = timeslot.startTime.split(":").slice(0, 2).join(":")
    const endTime = timeslot.endTime.split(":").slice(0, 2).join(":")

    return (
        <div className="card border-dark p-2" style={{minWidth: "5rem"}}>

            <div className="d-flex justify-content-around mb-3">
                <button className="square-button" onClick={event => deleteTimeSlot(dayID, timeslot.id)}>
                    <div className="square-button-icon">
                        <XMarkIcon/>
                    </div>
                </button>

                <button className="square-button" onClick={event => deleteTimeSlot(dayID, timeslot.id)}>
                    <div className="square-button-icon">
                        <PencilIcon/>
                    </div>
                </button>
            </div>

            <table>
                <tbody>
                    <tr>
                        <th className="text-right">desde</th>
                        <td className="time">{startTime}</td>
                    </tr>
                    <tr>
                        <th className="text-right">hasta</th>
                        <td className="time">{endTime}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default TimeSlot