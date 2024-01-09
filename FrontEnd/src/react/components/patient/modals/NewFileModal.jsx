import { DocumentTextIcon } from '@heroicons/react/24/solid'
import { MODALMODES } from '../../../constants/modal'
import { InputV2, ModalTemplate } from '../../basis'

const NewFileModal = ({ showModal, modalMode, formManager, handleClose, isLoading }) => {
    const name = formManager.getValues('name')
    const description = formManager.getValues('description')
    const image = formManager.getValues('image')

    if (modalMode === MODALMODES.Delete) {
        return (
            <ModalTemplate show={showModal} handleClose={handleClose} title='Archivos'>
                <div className='d-flex flex-column gap-3'>
                    <div>
                        ¿Seguro que desea eliminar este archivo?
                    </div>
                    <div className='d-flex gap-3'>
                        {
                            image
                            ? <div>
                                <img src={image} className='border rounded-2' alt='thumbnail' style={{ width: '200px' }}/>
                            </div>
                            : <div
                                className='d-flex justify-content-center align-items-center border rounded-2'
                                style={{ width: '175px', height: '175px' }}
                            >
                                <DocumentTextIcon style={{ width: '5rem', height: '5rem' }}/>
                            </div>
                        }
                        <div className='d-flex flex-column gap-3'>
                            <div>
                                <strong>Nombre del archivo</strong>
                                <div className='text-break'>{name}</div>
                            </div>
                            <div>
                                <strong>Descripción</strong>
                                <div className='text-break'>{description}</div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end gap-2'>
                        <button
                            className='btn btn-success d-flex gap-2 align-items-center'
                            disabled={isLoading}
                            onClick={formManager.handleSubmit}
                        >
                            Confirmar
                            <div
                                className='spinner-border'
                                style={{width: '1rem', height: '1rem', borderWidth: '2px', display: isLoading ? 'inherit' : 'none'}}
                            />
                        </button>

                        <button
                            className='btn btn-danger d-flex gap-2 align-items-center'
                            disabled={isLoading}
                            onClick={handleClose}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </ModalTemplate>
        )
    }

    return (
        <ModalTemplate show={showModal} handleClose={handleClose} title='Archivos'>
            <form className='d-flex flex-column gap-3' onSubmit={formManager.handleSubmit}>
                {
                    modalMode === MODALMODES.Add &&
                    <div className='row'>
                        <InputV2
                            formManager={formManager}
                            type='file'
                            name='file'
                            label='Seleccione un archivo'
                            placeholder='Seleccione un archivo'
                            errors={{ required: 'Debe seleccionar un archivo' }}
                        />
                    </div>
                }

                {
                    modalMode === MODALMODES.Edit &&
                    <div className='row'>
                        <InputV2 
                            formManager={formManager}
                            type='text'
                            name='name'
                            placeholder='Ingrese el nombre del archivo...'
                            label='Nombre del archivo'
                            errors={{ required: 'El nombre del archivo es requerido', pattern:{ value: /^[a-zA-z0-9ÑñÁáÉéÍíÓóÚú.\s-]+$/, message:'El formato del nombre es incorrecto' } }}
                        />
                    </div>
                }

                <div className='row'>
                    <InputV2 
                        formManager={formManager}
                        type='textarea'
                        name='description'
                        label='Descripción del archivo'
                        placeholder='Ingrese una descripción del archivo...'
                        height={'128px'}
                        errors={{
                            required: 'La descripción del archivo es requerida',
                            pattern: { value: /^[a-zA-z0-9ÑñÁáÉéÍíÓóÚú\s-.,;:"'%#°<>_]+$/, message:'El formato de la descripción es incorrecta' } 
                        }}
                    />
                </div>

                <div className='d-flex justify-content-end gap-2'>
                    <button className='btn btn-success d-flex gap-2 align-items-center' disabled={isLoading}>
                        Guardar
                        <div
                            className='spinner-border'
                            style={{width: '1rem', height: '1rem', borderWidth: '2px', display: isLoading ? 'inherit' : 'none'}}
                        />
                    </button>

                    <button
                        className='btn btn-danger d-flex gap-2 align-items-center'
                        disabled={isLoading}
                        onClick={handleClose}
                    >
                        Cancelar
                    </button>
                </div>

            </form>
        </ModalTemplate>
    )
}

export default NewFileModal