import { COLORS } from '../../constants/eventColors'
import { MODALMODES } from '../../constants/modal'
import { InputV2 } from '../basis'

const Exception = ({ loading, modalMode, exceptionForm }) => {
    if (modalMode === MODALMODES.Delete) {
        return (
            <div>
                <div>¿Confirma que desea eliminar la siguiente excepción?</div>

                <div
                    className='flex-grow-1 rounded-2 my-3 p-2 text-white'
                    style={{ backgroundColor: COLORS[exceptionForm.getValues('id') % COLORS.length] }}
                >
                    {`${exceptionForm.getValues('startDate')} ${exceptionForm.getValues('startTime')} hs - ${exceptionForm.getValues('endDate')} ${exceptionForm.getValues('endTime')} hs`}
                    <div>{exceptionForm.getValues('description')}</div>
                </div>

                <div className='d-flex justify-content-end'>
                    <button className='btn btn-danger d-flex gap-2 align-items-center' onClick={exceptionForm.handleSubmit} disabled={loading}>
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
        <form className='d-flex flex-column gap-3' onSubmit={exceptionForm.handleSubmit}>

            <div className='d-flex flex-wrap gap-3'>
                <div className='flex-grow-1'>
                    <InputV2
                        formManager={{ register: exceptionForm.register, errors: exceptionForm.formState.errors }}
                        label='Fecha'
                        name='startDate'
                        type='date'
                    />
                </div>

                <div className='flex-grow-1'>
                    <InputV2
                        formManager={{ register: exceptionForm.register, errors: exceptionForm.formState.errors }}
                        label='Hora'
                        name='startTime'
                        type='time'
                    />
                </div>
            </div>

            <div className='d-flex flex-wrap gap-3'>
                <div className='flex-grow-1'>
                    <InputV2
                        formManager={{ register: exceptionForm.register, errors: exceptionForm.formState.errors }}
                        label='Fecha'
                        name='endDate'
                        type='date'
                    />
                </div>

                <div className='flex-grow-1'>
                    <InputV2
                        formManager={{ register: exceptionForm.register, errors: exceptionForm.formState.errors }}
                        label='Hora'
                        name='endTime'
                        type='time'
                    />
                </div>
            </div>

            <div className='row'>
                <InputV2
                    formManager={{ register: exceptionForm.register, errors: exceptionForm.formState.errors }}
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

export default Exception