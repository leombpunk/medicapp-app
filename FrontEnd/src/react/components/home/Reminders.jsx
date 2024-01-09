import { getStringDateTimeInLanguageTimeZone } from "../../constants/constants"
import { Pagination, TableV2 } from "../basis"
import { useReminders } from "../hooks"
import { useSettingsContext } from "../providers/SettingsProvider"

const Reminders = () => {
    const { timeZone } = useSettingsContext()
    const {
        loading, reminders, order, page, totalPages, handleOrder, handlePage, handleStart, handleEnd
    } = useReminders()

    const handleStartInput = ({ target }) => {
        const date = target.value
        const start = `${date}T00:00:00${timeZone.numeric}`
        handleStart(start)
    }

    const handleEndInput = ({ target }) => {
        const date = target.value
        const end = `${date}T23:59:00${timeZone.numeric}`
        handleEnd(end)
    }

    return (
        <div className='flex-grow-1 d-flex flex-column align-items-center justify-content-between gap-4'>

        <div className='d-flex gap-3 w-100'>
            <div className='input-group'>
                <label className='input-group-text'>Desde</label>
                <input className='form-control' type='date' name='startTime' onChange={handleStartInput}/>
            </div>

            <div className='input-group'>
                <label className='input-group-text'>Hasta</label>
                <input className='form-control' type='date' name='endTime' onChange={handleEndInput}/>
            </div>

        </div>

        <TableV2
            loading={loading}
            items={reminders}
            columns={[
                { name: "Paciente", key: "patient", value: (v) => (v ? `${v.surnames} ${v.names}` : ''), ordered: false },
                { name: "Profesional", key: "profesional", value: (v) => (`${v?.surnames} ${v?.names}`), ordered: false },
                { name: "Fecha", key: "dateTime", value: (v) => getStringDateTimeInLanguageTimeZone(new Date(v), 'es-AR', timeZone), ordered: false },
                { name: "Descripcion", key: "description", ordered: false },
            ]}
            order={order}
            handleOrder={handleOrder}
            isPressable={false}

            tableHeight={"calc(100vh - 4rem - (3rem + 38px + 3rem + 38px + 8rem))"}
        />

        <Pagination page={page} totalPages={totalPages} handlePage={handlePage}/>
      </div>
    )
}

export default Reminders