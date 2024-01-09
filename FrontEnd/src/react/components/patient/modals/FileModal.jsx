import { ModalTemplate, ModalAlert, InputV2 } from '../../basis'

const MODE = {
    Add: 1,
    Edit: 2,
    Delete: 3
}

const FileModal =({ show, mode, loading, handleClose, handleConfirm, alert, formManager }) => {
    return (
        <>
            <ModalTemplate show={show} title={mode === MODE.Add ? 'Añadir' : 'Editar'} handleClose={handleClose}>
                <form className='d-flex flex-column gap-3' onSubmit={handleConfirm}>
                    {
                        mode === MODE.Add
                        ? <div className='row'>
                            <InputV2 
                                formManager={formManager}
                                type='file'
                                name='file'
                                label='Seleccione un archivo'
                                placeholder='Seleccione un archivo'
                                errors={{ required: 'Debe seleccionar un archivo' }}
                            />
                        </div>
                        : null
                    }

                    {
                        mode === MODE.Edit
                        ? <div className='row'>
                            <InputV2 
                                formManager={formManager}
                                type='text'
                                name='name'
                                placeholder='Ingrese el nombre del archivo...'
                                label='Nombre del archivo'
                                errors={{ required: 'El nombre del archivo es requerido', pattern:{ value: /^[a-zA-z0-9ÑñÁáÉéÍíÓóÚú.\s-]+$/, message:'El formato del nombre es incorrecto' } }}
                            />
                        </div>
                        : null
                    }

                    <div className='row'>
                        <InputV2 
                            formManager={formManager}
                            type='textarea'
                            name='description'
                            label='Descripción del archivo'
                            placeholder='Ingrese una descripción del archivo...'
                            height={"128px"}
                            errors={{ required: 'La descripción del archivo es requerida', pattern:{ value: /^[a-zA-z0-9ÑñÁáÉéÍíÓóÚú\s-.,;:"'%#°<>_]+$/, message:'El formato de la descripción es incorrecta' } }}
                        />
                    </div>

                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-success d-flex gap-2 align-items-center' disabled={loading}>
                            Guardar
                            <div className="spinner-border" style={{width: "1rem", height: "1rem", borderWidth: "2px", display: loading ? 'inherit' : 'none'}}/>
                        </button>
                    </div>
                </form>
            </ModalTemplate>

            <ModalAlert title={"Alerta!"} show={alert.showAlert} handleConfirm={handleConfirm} handleClose={alert.handleCloseAlert} loading={loading}>
                <div>
                    <div>Ya existe este archivo en el sistema. ¿Desea reemplazarlo?</div>
                </div>
            </ModalAlert>
        </>
    )
}

export default FileModal