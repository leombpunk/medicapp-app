import { useState } from 'react'
import { usePatientTurns, useProfesionals } from '../hooks'
import { Button, TableV2 } from '../basis'
import { useNavigate } from 'react-router-dom'
import { getStringDateInTimeZone, getStringDateTimeInLanguageTimeZone } from '../../constants/constants'
import { useSettingsContext } from '../providers/SettingsProvider'
import { RoutesNavigation } from '../../constants/RoutesNavigation'
import { Pagination } from 'react-bootstrap'

const Turns = () => {
    const navigate = useNavigate()
    const { timeZone } = useSettingsContext()
    const { profesionals } = useProfesionals(true)
    const [idProfesional, setIdProfesional] = useState(undefined)
    const [startTime, setStartTime] = useState(undefined)
    const [endTime, setEndTime] = useState(undefined)

    const {
        loading,
        turns,
        order,
        page,
        totalPages,
        handleOrder,
        handlePage,
        handleReset
    } = usePatientTurns({ idProfesional, startTime, endTime })

    const handleTurnsToday = () => {
        const today = new Date()
        const startTime = `${getStringDateInTimeZone(today, timeZone)}T00:00:00${timeZone.numeric}`
        const endTime = `${getStringDateInTimeZone(today, timeZone)}T23:59:00${timeZone.numeric}`
        navigate(`${RoutesNavigation.Turns}?startTime=${startTime}&endTime=${endTime}`)
    }

    const handleProfesional = ({ target }) => {
        handleReset()
        setIdProfesional(target.value)
    }

    const handleDate = ({ target }) => {
        handleReset()
        const date = target.value
        const start = `${date}T00:00:00${timeZone.numeric}`
        const end = `${date}T23:59:00${timeZone.numeric}`
        console.log({ start, end })
        setStartTime(start)
        setEndTime(end)
    }

    return (
        <div className='flex-grow-1 d-flex flex-column align-items-center justify-content-between gap-4'>
            <div className='d-flex gap-3 w-100'>
                <div className='input-group'>
                    <label className='input-group-text'>Profesionales</label>
                    <select className='form-select' onChange={handleProfesional}>
                        <option defaultValue disabled>Seleccione...</option>
                        {
                            profesionals.length 
                            ? profesionals.map(profesional =>
                                <option key={profesional.id} value={profesional.id}>{`${profesional.surnames} ${profesional.names}`}</option>
                            ) : (
                                <option>No hay profesionales</option>
                            )
                        }
                    </select>
                </div>

                <div className='input-group'>
                    <label className='input-group-text'>Fecha</label>
                    <input className='form-control' placeholder='Fecha' type='date' onChange={handleDate}/>
                </div>

                <div>
                    <Button
                        className='btn-outline-system'
                        text='Ver hoy'
                        handleOnClick={handleTurnsToday}
                    />
                </div>
            </div>

            <TableV2
                loading={loading}
                items={turns}
                columns={[
                    { name: 'Paciente', key: 'patient', value: (v) => (`${v.surnames} ${v.names}`),ordered: false },
                    { name: 'Fecha', key: 'dateTime', value: (v) => (getStringDateTimeInLanguageTimeZone(new Date(v), 'es-AR', timeZone)), ordered: false },
                    { name: 'Duración', key: 'duration', ordered: false },
                    { name: 'Descripción', key: 'description', ordered: false },
                ]}
                order={order}
                handleOrder={handleOrder}
                isPressable={false}
                tableHeight={"calc(100vh - 4rem - (3rem + 38px + 3rem + 38px + 4rem))"}
            />
        </div>
    )
}

export default Turns
