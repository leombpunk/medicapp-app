import { localeStringDateTime } from "../constants/constants"
function EventException({data, width, height, x, y}) {

    return (
        <>
            <div className="turn exception" style={{width: `${width}%`, height: `${height}%`, top: `${y}%`, left: `${x}%`}}>
                <div>Desde {`${data.startDateTime.toLocaleString("es-ES", localeStringDateTime)}`}</div>
                <div>Hasta {`${data.endDateTime.toLocaleString("es-ES", localeStringDateTime)}`}</div>
                <div>{data.description}</div>
            </div>
        </>
    )
}

export default EventException