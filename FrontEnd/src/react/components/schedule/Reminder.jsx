import { COLORS } from '../../constants/eventColors'
import { MODALMODES } from '../../constants/modal'
import { AutoCompleteV2, InputV2 } from '../basis'
import { usePatients } from '../hooks'
import ACPatientItem from './ACPatientItem'
import ACPatientItemSelected from './ACPatientItemSelected'

const Reminder = ({ loading, modalMode, reminderForm }) => {
    const { patients, search, handleSearch } = usePatients({})

    if (modalMode === MODALMODES.Delete) {
        const reminderPatient = reminderForm.patient
        const reminderTime = reminderForm.getValues('time')
        const reminderDescription = reminderForm.getValues('description')

        return (
            <div>
                <div>¿Confirma que desea eliminar el siguiente recordatorio?</div>

                <div
                    className='flex-grow-1 rounded-2 my-3 p-2 text-white'
                    style={{ backgroundColor: COLORS[reminderForm.getValues('id') % COLORS.length] }}
                >
                    {`${reminderTime} hs`}
                    {
                        reminderPatient &&
                        <div className='fw-bold' style={{ fontSize: '1.25rem' }}>
                            <div>{`${reminderPatient.surnames} ${reminderPatient.names}`}</div>
                        </div>
                    }
                    <div>{reminderDescription}</div>
                </div>

                <div className='d-flex justify-content-end'>
                    <button className='btn btn-danger d-flex gap-2 align-items-center' onClick={reminderForm.handleSubmit} disabled={loading}>
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
        <form className='d-flex flex-column gap-3' onSubmit={reminderForm.handleSubmit}>

            <div className='row'>
                <AutoCompleteV2
                    label='Paciente'
                    name='patient'
                    items={patients}
                    handleSearch={handleSearch}
                    currentSearch={search}
                    formManager={{ ...reminderForm, errors: reminderForm.formState.errors }}
                    ItemComponent={ACPatientItem}
                    handleValue={reminderForm.setPatient}
                    currentValue={reminderForm.patient}
                    ItemSelected={ACPatientItemSelected}
                    isDisabled={modalMode !== MODALMODES.Add}
                    isRequired={false}
                />
            </div>

            <div className='d-flex flex-wrap gap-3'>
                <div className='flex-grow-1'>
                    <InputV2
                        formManager={{ register: reminderForm.register, errors: reminderForm.formState.errors }}
                        label='Fecha'
                        name='date'
                        type='date'
                    />
                </div>

                <div className='flex-grow-1'>
                    <InputV2
                        formManager={{ register: reminderForm.register, errors: reminderForm.formState.errors }}
                        label='Hora'
                        name='time'
                        type='time'
                    />
                </div>
            </div>

            <div className='row'>
                <InputV2
                    formManager={{ register: reminderForm.register, errors: reminderForm.formState.errors }}
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

export default Reminder