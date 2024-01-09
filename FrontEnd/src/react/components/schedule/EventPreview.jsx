import { CheckIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/solid'
//import { ModalTemplate } from '../basis'
import { COLORS } from '../../constants/eventColors'
import { MODALMODES, MODALTABS } from '../../constants/modal'
import { getStringDateInLanguageTimeZone, getStringTimeInTimeZone } from '../../constants/constants'
import { useSettingsContext } from '../providers/SettingsProvider'
import { Button } from '../basis'

const TITLES_ES = {
    'turn': 'Turno',
    'exception': 'Excepción',
    'reminder': 'Recordatorio'
}

const EventPreview = ({ modalShow, handleModalClose, data, handleConfirmTurn, handleEventModal, canModify }) => {
    const { timeZone } = useSettingsContext()
    const isReminder = data.type === 'reminder'
    const isException = data.type === 'exception'
    const isTurn = data.type === 'turn'
    const isConfirmed = data.status === 1
    const startTime = getStringTimeInTimeZone(new Date(data.startTime), timeZone)
    const endTime   = getStringTimeInTimeZone(new Date(data.endTime), timeZone)
    const startDate = getStringDateInLanguageTimeZone(new Date(data.startTime), 'es-ES', timeZone)
    const endDate = getStringDateInLanguageTimeZone(new Date(data.endTime), 'es-ES', timeZone)

    const handleConfirm = async () => {
        try {
            const response = await handleConfirmTurn(data.id)

            if (response.status === 200) {
                handleModalClose()
            }
        } catch (error) {
        }
    }

    const handleEdit = () => {
        const actions = {
            turn: () => handleEventModal(MODALTABS.Turns, MODALMODES.Edit, data),
            exception: () => handleEventModal(MODALTABS.Exceptions, MODALMODES.Edit, data),
            reminder: () => handleEventModal(MODALTABS.Reminders, MODALMODES.Edit, data),
        }

        const action = actions[data.type]
        handleModalClose()
        action()
    }

    const handleDelete = () => {
        const actions = {
            turn: () => handleEventModal(MODALTABS.Turns, MODALMODES.Delete, data),
            exception: () => handleEventModal(MODALTABS.Exceptions, MODALMODES.Delete, data),
            reminder: () => handleEventModal(MODALTABS.Reminders, MODALMODES.Delete, data),
        }
        const action = actions[data.type]
        handleModalClose()
        action()
    }

    return (
        <>
            {
                modalShow && 
                <>
                    <div className='fade modal-backdrop show'></div>
                    <div className='fade modal show d-block' tabIndex='-1'>
                        <div role='dialog' className='modal-dialog modal-dialog-centered'>
                            <div className={`modal-content ${isException ? 'pattern2' : '' }`} style={{ backgroundColor: COLORS[data.id % COLORS.length], borderWidth: 0 }}>
                                <div className='modal-body text-light'>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <h4>{TITLES_ES[data.type]}</h4>
                                        <button className='btn btn-outline-light' style={{ borderRadius: '50%', padding: '6px' }} onClick={handleModalClose}>
                                            <XMarkIcon style={{ width: '1.5rem', height: '1.5rem' }}/>
                                        </button>
                                    </div>
                                    <div>
                                        <div>
                                            <div className='d-flex flex-column mb-4'>
                                                {
                                                    data?.patient &&
                                                    <div className='fw-bold' style={{ fontSize: '1.25rem' }}>
                                                        <div>{`${data.patient.surnames} ${data.patient.names}`}</div>
                                                    </div>
                                                }
                                                {
                                                    isReminder
                                                    ? <div>{`${startDate} ${startTime} hs`}</div>
                                                    : isException
                                                    ? <div>{`${startDate} ${startTime} hs - ${endDate} ${endTime} hs`}</div>
                                                    : <div>{`${startDate} ${startTime} hs - ${endTime} hs`}</div>
                                                }
                                                {
                                                    data?.treatment &&
                                                    <b>{data.treatment.description}</b>
                                                }    
                                                {
                                                    data?.description &&
                                                    <div>{data.description}</div>
                                                }        
                                            </div>

                                            {
                                                canModify &&
                                                <div className='d-flex justify-content-end gap-2'>
                                                    {
                                                        isTurn &&
                                                        <Button
                                                            className={isConfirmed ? 'btn-light' : 'btn-outline-light'}
                                                            Icon={CheckIcon}
                                                            text='Atendido'
                                                            isActived={isConfirmed}
                                                            isDisabled={isConfirmed}
                                                            handleOnClick={handleConfirm}
                                                        />
                                                    }
                                                    <Button
                                                        className={isConfirmed ? 'btn-light' : 'btn-outline-light'}
                                                        Icon={PencilIcon}
                                                        text='Editar'
                                                        isActived={isConfirmed}
                                                        isDisabled={isConfirmed}
                                                        handleOnClick={handleEdit}
                                                    />

                                                    <Button
                                                        className='btn-outline-light'
                                                        Icon={TrashIcon}
                                                        text='Eliminar'
                                                        handleOnClick={handleDelete}
                                                    />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
        /*
        <ModalTemplate show={modalShow} title='' handleClose={handleModalClose} contentStyle={{ backgroundColor: COLORS[data.id % COLORS.length], borderColor: 'none' }}>
            <div className='text-light'>
                <div className='d-flex flex-column'>
                    {
                        data?.patient &&
                        <div className='fw-bold' style={{ fontSize: '1.25rem' }}>
                            <div>{`${data.patient.surnames} ${data.patient.names}`}</div>
                        </div>
                    }
                    {
                        data?.description &&
                        <div>{data.description}</div>
                    }        
                </div>

                <div className='d-flex justify-content-end gap-2'>
                    <button className='btn btn-outline-light d-flex gap-1 align-items-center'>
                        <CheckIcon style={iconStyle}/>
                        Atendido
                    </button>
                    <button className='btn btn-outline-light d-flex gap-1 align-items-center'>
                        <ClockIcon style={iconStyle}/>
                        Reprogramar
                    </button>
                    <button className='btn btn-outline-light d-flex gap-1 align-items-center'>
                        <TrashIcon style={iconStyle}/>
                        Eliminar
                    </button>
                </div>
            </div>
        </ModalTemplate>
        */
    )
}

export default EventPreview