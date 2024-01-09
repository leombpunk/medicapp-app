import { COLORS } from '../../constants/eventColors'
import { MODALMODES } from '../../constants/modal'
import { AutoCompleteV2, InputV2 } from '../basis'
import { usePatients, useProfesionalTreatments } from '../hooks'
import ACPatientItem from './ACPatientItem'
import ACPatientItemSelected from './ACPatientItemSelected'
import ACTreatmentItem from './ACTreatmentItem'
import ACTreatmentItemSelected from './ACTreatmentItemSelected'

const Turn = ({ loading, modalMode, profesional, turnForm }) => {
    const { patients, search, handleSearch } = usePatients({})
    const { treatments, search: searchTreatment, handleSearch: handleSearchTreatment } = useProfesionalTreatments(profesional?.id)

    if (modalMode === MODALMODES.Delete) {
        return (
            <div>
                <div>¿Confirma que desea eliminar el siguiente turno?</div>

                <div
                    className='flex-grow-1 rounded-2 my-3 p-2 text-white'
                    style={{ backgroundColor: COLORS[turnForm.getValues('id') % COLORS.length] }}
                >
                    {`${turnForm.getValues('time')} hs`}
                    <div className='fw-bold' style={{ fontSize: '1.25rem' }}>
                        <div>{`${turnForm.patient.surnames} ${turnForm.patient.names}`}</div>
                    </div>
                    <div>{turnForm.getValues('description')}</div>
                </div>

                <div className='d-flex justify-content-end'>
                    <button className='btn btn-danger d-flex gap-2 align-items-center' onClick={turnForm.handleSubmit} disabled={loading}>
                        Confirmar
                        <div
                            className='spinner-border'
                            style={{width: '1rem', height: '1rem', borderWidth: '2px', display: loading ? 'inherit' : 'none'}}
                        />
                    </button>
                </div>
            </div>
        )
    }

    return (
        <form className='d-flex flex-column gap-3' onSubmit={turnForm.handleSubmit}>
            
            <div className='row'>
                <AutoCompleteV2
                    label='Paciente'
                    name='patient'
                    items={patients}
                    handleSearch={handleSearch}
                    currentSearch={search}
                    formManager={{ ...turnForm, errors: turnForm.formState.errors }}
                    ItemComponent={ACPatientItem}
                    handleValue={turnForm.setPatient}
                    currentValue={turnForm.patient}
                    ItemSelected={ACPatientItemSelected}
                    isDisabled={modalMode !== MODALMODES.Add}
                    isRequired={true}
                />
            </div>

            <div className='d-flex flex-wrap gap-3'>
                <div className='flex-grow-1'>
                    <InputV2
                        formManager={{ register: turnForm.register, errors: turnForm.formState.errors }}
                        label='Fecha'
                        name='date'
                        type='date'
                    />
                </div>

                <div className='flex-grow-1'>
                    <InputV2
                        formManager={{ register: turnForm.register, errors: turnForm.formState.errors }}
                        label='Hora'
                        name='time'
                        type='time'
                    />
                </div>
            </div>

            <div className='row'>
                <InputV2
                    formManager={{ register: turnForm.register, errors: turnForm.formState.errors }}
                    label='Duración'
                    name='duration'
                    type='select'
                    options={[
                        // { value: '00:15', description: '15 minutos' },
                        { value: '00:30', description: '30 minutos' },
                        { value: '01:00', description: '1 hora' },
                        { value: '01:30', description: '1 hora y 30 minutos' },
                        { value: '02:00', description: '2 horas' },
                    ]}
                />
            </div>

            <div className='row'>
                <AutoCompleteV2
                    label='Tratamiento'
                    name='treatment'
                    items={treatments}
                    handleSearch={handleSearchTreatment}
                    currentSearch={searchTreatment}
                    formManager={{ ...turnForm, errors: turnForm.formState.errors }}
                    ItemComponent={ACTreatmentItem}
                    handleValue={turnForm.setTreatment}
                    currentValue={turnForm.treatment}
                    ItemSelected={ACTreatmentItemSelected}
                />
            </div>

            <div className='row'>
                <InputV2
                    formManager={{ register: turnForm.register, errors: turnForm.formState.errors }}
                    label='Descripción'
                    name='description'
                    type='textarea'
                    placeholder='Ingrese una descripción...'
                    height='128px'
                />
            </div>


            <div className='d-flex justify-content-end'>
                <button className='btn btn-success d-flex gap-2 align-items-center' disabled={loading}>
                    Guardar
                    <div
                        className='spinner-border'
                        style={{width: '1rem', height: '1rem', borderWidth: '2px', display: loading ? 'inherit' : 'none'}}
                    />
                </button>
            </div>
        </form>
    )
}

export default Turn