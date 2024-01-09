import { useNavigate, useSearchParams } from 'react-router-dom'
import { usePatient, usePatientTurns, usePatients, useProfesional, useProfesionalTreatment, useProfesionalTreatments, useProfesionals } from '../components/hooks'
import { AutoComplete, Button, Title, TurnsList } from '../components/basis'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import { ORDER, getStringDateInTimeZone } from '../constants/constants'
import { TURN_STATUS } from '../constants/turnstatus'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'

const Turns = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const startTime = searchParams.get('startTime')
    const endTime = searchParams.get('endTime')
    const idPatient = searchParams.get('idPatient')
    const idProfesional = searchParams.get('idProfesional')
    const idTreatment = searchParams.get('idTreatment')
    const status = searchParams.get('status')
    
    const { timeZone } = useSettingsContext()
    const { patient } = usePatient(idPatient)
    const { patients, handleSearch: handleSearchPatient } = usePatients({})
    const { profesional } = useProfesional(idProfesional)
    const { profesionals, handleSearch: handleSearchProfesional } = useProfesionals()
    const { treatment } = useProfesionalTreatment(idProfesional, idTreatment)
    const { treatments, handleSearch: handleSearchTreatment } = useProfesionalTreatments(idProfesional)
    const { isLoading, turns, order, handleOrder, handlePage, handleReset, page, totalPages } = usePatientTurns({ idPatient, idProfesional, idTreatment, startTime, endTime, status })

    const handleStartTimeInput = ({ target }) => {
        const date = target.value
        const startTime = date ? `${date}T00:00:00${timeZone.numeric}` : ''

        setSearchParams(params => {
            params.set('startTime', startTime)
            return params
        })
        handleReset()
    }

    const handleEndTimeInput = ({ target }) => {
        const date = target.value
        const endTime = date ? `${date}T23:59:00${timeZone.numeric}` : ''

        setSearchParams(params => {
            params.set('endTime', endTime)
            return params
        })
        handleReset()
    }

    const handlePatient = (patient) => {
        setSearchParams(params => {
            if (patient?.id) {
                params.set('idPatient', patient.id)
            } else {
                params.delete('idPatient')
            }
            return params
        })
        handleReset()
    }

    const handleProfesional = (profesional) => {
        setSearchParams(params => {
            if (profesional?.id) {
                params.set('idProfesional', profesional.id)
            } else {
                params.delete('idProfesional')
            }
            return params
        })
        handleReset()
    }

    const handleTreatment = (treatment) => {
        setSearchParams(params => {
            if (treatment?.id) {
                params.set('idTreatment', treatment.id)
            } else {
                params.delete('idTreatment')
            }
            return params
        })
        handleReset()
    }

    const handleOrderInput = ({ target }) => {
        handleOrder('dateTime', target.value)
        handleReset()
    }

    const handleStatusInput = ({ target }) => {
        setSearchParams(params => {
            if (target.value) {
                params.set('status', target.value)
            } else {
                params.delete('status')
            }
            return params
        })
        handleReset()
    }

    return (
        <div className='d-flex flex-column gap-4 w-100'>
            <Title Icon={CalendarDaysIcon} text='Turnos'>
                <div className='d-flex gap-2'>
                    <Button
                        Icon={ArrowUturnLeftIcon}
                        className='btn-outline-system'
                        text='Volver'
                        handleOnClick={() => navigate(-1)}
                    />
                </div>
            </Title>

            <div className='d-flex gap-3'>
                <div className='input-group'>
                    <label className='input-group-text'>Desde</label>
                    <input className='form-control' type='date' name='startTime' onChange={handleStartTimeInput} value={startTime ? getStringDateInTimeZone(new Date(startTime), timeZone) : ''}/>
                </div>

                <div className='input-group'>
                    <label className='input-group-text'>Hasta</label>
                    <input className='form-control' type='date' name='endTime' onChange={handleEndTimeInput} value={endTime ? getStringDateInTimeZone(new Date(endTime), timeZone) : ''}/>
                </div>

                <div className='input-group'>
                    <label className='input-group-text'>Orden</label>
                    <select className='form-select' defaultValue={order.dateTime} onChange={handleOrderInput}>
                        <option value={ORDER.Ascending}>Ascendente</option>
                        <option value={ORDER.Descending}>Descendente</option>
                    </select>
                </div>

                <div className='input-group'>
                    <label className='input-group-text'>Estado</label>
                    <select className='form-select' defaultValue={''} onChange={handleStatusInput}>
                        <option value={''}>Todos</option>
                        <option value={TURN_STATUS.Unconfirmed}>No atendido</option>
                        <option value={TURN_STATUS.Confirmed}>Atendido</option>
                        {/*<option value={TURN_STATUS.To_Reschedule}>Por repogramar</option>*/}
                    </select>
                </div>
            </div>

            <div className='d-flex gap-3'>
                <AutoComplete
                    before='Paciente'
                    items={patients}
                    handleSearch={handleSearchPatient}
                    handleValue={handlePatient}
                    currentValue={patient}
                    value={(data) => `${data.surnames} ${data.names}`}
                />

                <AutoComplete
                    before='Profesional'
                    items={profesionals}
                    handleSearch={handleSearchProfesional}
                    handleValue={handleProfesional}
                    currentValue={profesional}
                    value={(data) => `${data.surnames} ${data.names}`}
                />

                <AutoComplete
                    before='Tratamiento'
                    items={treatments}
                    handleSearch={handleSearchTreatment}
                    handleValue={handleTreatment}
                    currentValue={treatment}
                    value={(data) => data.description}
                    isDisabled={!idProfesional}
                />

            </div>

            <TurnsList data={turns}/>

            <div className='d-flex justify-content-center'>
                {
                    page < totalPages &&
                    <Button
                        className='btn-light'
                        text={`Ver más`}
                        isLoading={isLoading}
                        isDisabled={isLoading}
                        handleOnClick={handlePage}
                    />
                }
            </div>
        </div>
    )
}

export default Turns