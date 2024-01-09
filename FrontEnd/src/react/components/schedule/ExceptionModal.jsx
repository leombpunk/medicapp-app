import React from 'react'
import { ModalTemplate } from '../basis'
import useModal from '../hooks/useModal'

const MODE = {
    Add: 1,
    Edit: 2
}

function ExceptionModal({ mode, formManager }) {
    const { show, handleOpen, handleClose } = useModal()

    return (
        <>
            <button className='btn btn-outline-danger flex-grow-1' onClick={handleOpen}>Añadir Excepción</button>

            <ModalTemplate show={show} title={mode === MODE.Add ? 'Añadir' : 'Editar'} handleClose={handleClose}>
                <form className='d-flex flex-column gap-3' onSubmit={null}>

                    <div className='row'>
                        <div className='form-label'>Desde</div>
                        <div className='d-flex gap-3'>
                            <div className='flex-grow-1'>
                                <input
                                    type='date'
                                    className='form-control'
                                    { ...formManager?.register('description', { required: true }) }
                                />
                            </div>
                            <div className='flex-grow-1'>
                                <input
                                    type='time'
                                    className='form-control'
                                    { ...formManager?.register('description', { required: true }) }
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='form-label'>Hasta</div>
                        <div className='d-flex gap-3'>
                            <div className='flex-grow-1'>
                                <input
                                    type='date'
                                    className='form-control'
                                    { ...formManager?.register('description', { required: true }) }
                                />
                            </div>
                            <div className='flex-grow-1'>
                                <input
                                    type='time'
                                    className='form-control'
                                    { ...formManager?.register('description', { required: true }) }
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='form-label'>Descripción</div>
                        <div>
                            <textarea
                                className='form-control'
                                placeholder='Ingrese una descripción del evento...'
                                style={{height: "128px", resize: 'none'}}
                                { ...formManager?.register('description', { required: true }) }
                            />
                        </div>
                    </div>

                </form>
            </ModalTemplate>
        </>
    );
}

export default ExceptionModal
