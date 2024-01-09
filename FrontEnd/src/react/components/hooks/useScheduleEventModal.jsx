import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { getStringDateInTimeZone, getStringTimeInTimeZone } from '../../constants/constants'
import { MODALTABS, MODALMODES } from '../../constants/modal'
import { useNotificationsContext } from '../providers/NotificationsProvider'
import { useSettingsContext } from '../providers/SettingsProvider'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaExceptions, schemaReminders, schemaTurns } from '../../constants/schemasValidations'

const useScheduleEventModal = () => {
    const [loading, setLoading] = useState()
    const [modalTab, setModalTab] = useState(MODALTABS.Turns)
    const [modalMode, setModalMode] = useState(MODALMODES.Add)
    const [modalShow, setModalShow] = useState(false)
    let operations = {}

    const  { timeZone } = useSettingsContext()

    const turnForm = useForm({ resolver: yupResolver(schemaTurns) })
    const exceptionForm = useForm({ resolver: yupResolver(schemaExceptions) })
    const reminderForm = useForm({ resolver: yupResolver(schemaReminders) })
    const [patient, setPatient] = useState()
    const [treatment, setTreatment] = useState()
    const { addNotification } = useNotificationsContext()

    const setModalData = (tab, mode, data) => {
        if (mode === MODALMODES.Add) {
            setPatient(undefined)
            setTreatment(undefined)
            turnForm.reset({
                date: data.date,
                time: data.time,
            })
            exceptionForm.reset({
                startDate: data.date,
                startTime: data.time,
                endDate: data.date,
            })
            reminderForm.reset({
                date: data.date,
                time: data.time,
            })
            return
        } else {
            setPatient(data?.patient)
            setTreatment(data?.treatment)
            if (tab === MODALTABS.Turns) {
                turnForm.reset({
                    id: data.id,
                    patient: data.patient,
                    date: getStringDateInTimeZone(new Date(data.startTime), timeZone),
                    time: getStringTimeInTimeZone(new Date(data.startTime), timeZone),
                    duration: data.duration,
                    treatment: data.treatment,
                    description: data.description
                })
                return
            }
            if (tab === MODALTABS.Exceptions) {
                exceptionForm.reset({
                    id: data.id,
                    startDate: getStringDateInTimeZone(new Date(data.startDateTime), timeZone),
                    startTime: getStringTimeInTimeZone(new Date(data.startDateTime), timeZone),
                    endDate: getStringDateInTimeZone(new Date(data.endDateTime), timeZone),
                    endTime: getStringTimeInTimeZone(new Date(data.endDateTime), timeZone),
                    description: data.description
                })
                return
            }
            if (tab === MODALTABS.Reminders) {
                reminderForm.reset({
                    id: data.id,
                    patient: data.patient,
                    date: getStringDateInTimeZone(new Date(data.startTime), timeZone),
                    time: getStringTimeInTimeZone(new Date(data.startTime), timeZone),
                    description: data.description
                })
                return
            }
        }
    }

    const setOperations = (value) => {
        operations = value
    }

    const handleModalOpen = (tab, mode, data) => {
        setModalTab(tab ?? MODALTABS.Turns)
        setModalMode(mode ?? MODALMODES.Add)
        setModalData(tab ?? MODALTABS.Turns, mode ?? MODALMODES.Add, data)
        setModalShow(true)
    }

    const handleModalClose = () =>{
        setModalShow(false)
    }

    const handleConfirmTurn = async (data) => {
        console.log(data)
        try {
            setLoading(true)

            /* Add */
            if (modalMode === MODALMODES.Add) {
                const turn = {
                    idPatient: data.patient.id,
                    dateTime: `${data.date}T${data.time}:00${timeZone.numeric}`,
                    duration: data.duration,
                    idTreatment: data.treatment?.id,
                    description: data.description
                }
                
                const result = await operations.turns.create(turn)
                    
                if (result.status === 201) {
                    addNotification('Turno añadido exitosamente.', 'primary')
                    handleModalClose()
                }
                if (result.status === 50000) {
                    addNotification('Esta agenda no tiene franjas horarias establecidas.', 'danger')
                }
                if (result.status === 50002) {
                    addNotification('La hora y el día están fuera de las franjas horarias permitidas.', 'danger')
                }
                if (result.status === 50001) {
                    addNotification('No se puede añadir el nuevo turno porque uno o más eventos están dentro del mismo horario.', 'danger')
                }
            }
            /* Edit */
            if (modalMode === MODALMODES.Edit) {
                const turn = {
                    idTreatment: data.treatment?.id,
                    dateTime: `${data.date}T${data.time}:00${timeZone.numeric}`,
                    duration: data.duration,
                    description: data.description
                }
                
                const result = await operations.turns.update(data.id, turn)

                console.log(result)
                
                if (result.status === 200) {
                    addNotification('Turno editado exitosamente.', 'success')
                    handleModalClose()
                }
                if (result.status === 50002) {
                    addNotification('La hora y el día están fuera de las franjas horarias permitidas.', 'danger')
                }
                if (result.status === 50001) {
                    addNotification('No se puede añadir el nuevo turno porque uno o más eventos están dentro del mismo horario.', 'danger')
                }
            }
            /* Delete */
            if (modalMode === MODALMODES.Delete) {
                const result = await operations.turns.delete(data.id)
                    
                if (result.status === 200) {
                    addNotification('Turno eliminado exitosamente.', 'success')
                    handleModalClose()
                }
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleConfirmException = async (data) => {
        try {
            setLoading(true)
            /* Add */
            if (modalMode === MODALMODES.Add) {
                const exception = {
                    startDateTime: `${data.startDate}T${data.startTime}:00${timeZone.numeric}`,
                    endDateTime: `${data.endDate}T${data.endTime}:00${timeZone.numeric}`,
                    description: data.description
                }
    
                const result = await operations.exceptions.create(exception)
                    
                if (result.status === 201) {
                    addNotification('Excepción añadido exitosamente.', 'primary')
                    handleModalClose()
                }
                if (result.status === 50001) {
                    addNotification('No se puede añadir la nueva excepción porque uno o más eventos están dentro del mismo horario.', 'danger')
                }
            }
            /* Edit */
            if (modalMode === MODALMODES.Edit) {
                const exception = {
                    startDateTime: `${data.startDate}T${data.startTime}:00${timeZone.numeric}`,
                    endDateTime: `${data.endDate}T${data.endTime}:00${timeZone.numeric}`,
                    description: data.description
                }
    
                const result = await operations.exceptions.update(data.id, exception)

                if (result.status === 200) {
                    addNotification('Excepción editada exitosamente.', 'primary')
                    handleModalClose()
                }
                if (result.status === 50001) {
                    addNotification('No se puede añadir la nueva excepción porque uno o más eventos están dentro del mismo horario.', 'danger')
                }
            }
            /* Delete */
            if (modalMode === MODALMODES.Delete) {
                const result = await operations.exceptions.delete(data.id)
                    
                if (result.status === 200) {
                    addNotification('Excepción eliminada exitosamente.', 'success')
                    handleModalClose()
                }
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleConfirmReminder = async (data) => {
        console.log(data)
        try {
            setLoading(true)
            /* Add */
            if (modalMode === MODALMODES.Add) {
                const reminder = {
                    idPatient: patient?.id,
                    dateTime: `${data.date}T${data.time}:00${timeZone.numeric}`,
                    description: data.description
                }
    
                const result = await operations.reminders.create(reminder)
                    
                if (result.status === 201) {
                    addNotification('Recordatorio añadido exitosamente.', 'primary')
                    handleModalClose()
                }
            }
            /* Edit */
            if (modalMode === MODALMODES.Edit) {
                const reminder = {
                    dateTime: `${data.date}T${data.time}:00${timeZone.numeric}`,
                    description: data.description
                }
                
                const result = await operations.reminders.update(data.id, reminder)
                
                if (result.status === 200) {
                    addNotification('Recordatorio editado exitosamente.', 'success')
                    handleModalClose()
                }
            }
            /* Delete */
            if (modalMode === MODALMODES.Delete) {
                const result = await operations.reminders.delete(data.id)
                    
                if (result.status === 200) {
                    addNotification('Recordatorio eliminado exitosamente.', 'success')
                    handleModalClose()
                }
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        modalShow,
        handleModalOpen,
        handleModalClose,
        modalMode,
        handleModalMode: setModalMode,
        modalTab,
        handleModalTab: setModalTab,
        turnForm: {...turnForm, patient, setPatient, treatment, setTreatment, handleSubmit: turnForm.handleSubmit(handleConfirmTurn) },
        exceptionForm: { ...exceptionForm, handleSubmit: exceptionForm.handleSubmit(handleConfirmException)},
        reminderForm: { ...reminderForm, patient, setPatient, handleSubmit: reminderForm.handleSubmit(handleConfirmReminder)},
        setOperations
    }
}

export default useScheduleEventModal