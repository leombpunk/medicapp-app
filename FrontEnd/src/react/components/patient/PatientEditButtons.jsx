import { ArrowDownTrayIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

const iconStyle = {width: '1.25rem', height: '1.5rem'}

const PatientEditButtons = ({handleGet, handleEdit, handleDelete}) => {
    return(
        <div className='d-flex gap-2 justify-content-end'>
            <button className='btn btn-outline-secondary' onClick={handleGet} title='Descargar'>
                <ArrowDownTrayIcon style={iconStyle}/>
            </button>
            <button className='btn btn-outline-secondary' onClick={handleEdit} title='Editar'>
                <PencilIcon style={iconStyle}/>
            </button>
            <button className='btn btn-outline-secondary' onClick={handleDelete} title='Eliminar'>
                <TrashIcon style={iconStyle}/>
            </button>
        </div>
    )
}

export default PatientEditButtons