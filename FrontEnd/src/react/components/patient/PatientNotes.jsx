import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Button, Title } from '../basis'
import { getStringDateInLanguageTimeZone } from '../../constants/constants'
import { useSettingsContext } from '../providers/SettingsProvider'
import useNotesModal from './modals/useNotesModal'
import NotePreview from './modals/NotePreview'
import { useModal, usePatientNotes } from '../hooks'
import NoteModal from './modals/NoteModal'
import { MODALMODES } from '../../constants/modal'

const Notes = ({ data, handleOnClick }) => {
    const { timeZone } = useSettingsContext()

    return (
        <div className='card cursor-pointer' onClick={handleOnClick}>
            <div className='card-header'>
                {getStringDateInLanguageTimeZone(new Date(data.updatedAt), 'es-ES', timeZone)}
            </div>
            <div className='card-body'>
                <div className='text-maxlines-3'>{data.content}</div>
            </div>
        </div>
    )
}

const PatientNotes = ({ data }) => {
    const preview = useModal()
    const { notes, createNote, editNote, deleteNote } = usePatientNotes(data.id)
    const { show, mode, handleOpen, handleClose, formManager } = useNotesModal({ createNote, editNote, deleteNote })

    const handleOpenPreview = (data) => {
        formManager.reset(data)
        preview.handleOpen()
    }

    const handleEdit = () => {
        handleOpen(MODALMODES.Edit)
        preview.handleClose()
    }

    const handleDelete = () => {
        handleOpen(MODALMODES.Delete)
        preview.handleClose()
    }

    return (
        <div className='d-flex flex-column gap-3'>
            <Title Icon={PencilSquareIcon} text='Notas de Historia Clínica'>
                <div>
                    <Button
                        className='btn-outline-primary'
                        Icon={PlusIcon}
                        text='Añadir'
                        handleOnClick={() => handleOpen(MODALMODES.Add)}
                    />
                </div>
            </Title>

            <div className='d-flex flex-column gap-3'>
                {
                    notes.length
                    ? notes.map(note => <Notes key={note.id} data={note} handleOnClick={() => handleOpenPreview(note)}/>)
                    : <>
                        <div className='border rounded d-flex justify-content-center align-items-center p-2'>
                            No se han encontrado resultados
                        </div>
                    </>
                }
            </div>

            <NotePreview showModal={preview.show} handleClose={preview.handleClose} formManager={formManager} handleEdit={handleEdit} handleDelete={handleDelete}/>
            <NoteModal showModal={show} modalMode={mode} handleClose={handleClose} formManager={formManager}/>
        </div>
    )
}

export default PatientNotes