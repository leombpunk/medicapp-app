import { ModalTemplate } from '../basis'
import { useScheduleContext } from '../providers/ScheduleProvider'
import { MODALMODES, MODALTABS } from '../../constants/modal'

import Turn from './Turn'
import Exception from './Exception'
import Reminder from './Reminder'

const Button = ({ text, handleButton, isActive, isDisabled }) => {
    return (
        <button
        className={`btn ${isActive ? 'btn-primary' : 'btn-simple'}`}
        onClick={handleButton}
        disabled={isDisabled}>
            {text}
        </button>
    )
}

const EventsModal = ({ profesional }) => {
    const {
        loading,
        modalShow,
        handleModalClose,
        modalTab,
        handleModalTab,
        modalMode,
        turnForm,
        exceptionForm,
        reminderForm
    } = useScheduleContext()

    const isButtonsDisabled = modalMode !== MODALMODES.Add

    return (
        <ModalTemplate show={modalShow} title={'Eventos'} handleClose={handleModalClose}>

            <div className='d-flex flex-column gap-4'>
                <div className='d-flex gap-2'>
                    <Button text='Turno' handleButton={() => handleModalTab(MODALTABS.Turns)} isActive={modalTab === MODALTABS.Turns} isDisabled={isButtonsDisabled}/>
                    <Button text='Recordatorios' handleButton={() => handleModalTab(MODALTABS.Reminders)} isActive={modalTab === MODALTABS.Reminders} isDisabled={isButtonsDisabled}/>
                    <Button text='Excepciones' handleButton={() => handleModalTab(MODALTABS.Exceptions)} isActive={modalTab === MODALTABS.Exceptions} isDisabled={isButtonsDisabled}/>
                </div>

                <div>
                    {modalTab === MODALTABS.Turns && <Turn loading={loading} modalMode={modalMode} turnForm={turnForm} profesional={profesional}/>}
                    {modalTab === MODALTABS.Reminders && <Reminder loading={loading} modalMode={modalMode} reminderForm={reminderForm}/>}
                    {modalTab === MODALTABS.Exceptions && <Exception loading={loading} modalMode={modalMode} exceptionForm={exceptionForm}/>}        
                </div>
            </div>
            
        </ModalTemplate>
    )
}

export default EventsModal