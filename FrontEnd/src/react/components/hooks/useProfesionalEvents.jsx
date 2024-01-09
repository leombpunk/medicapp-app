import { useEffect, useState } from 'react'
import { useUserContext } from '../providers/UserProvider'
import { useSettingsContext } from '../providers/SettingsProvider'
import { UTC, getStringDateInTimeZone } from '../../constants/constants'
import profesionalServices from '../../services/profesionals'
import turnServices from '../../services/turns'
import reminderServices from '../../services/reminders'
import exceptionServices from '../../services/exceptions'

const useProfesionalEvents = (idProfesional, date) => {
    const [events, setEvents] = useState([])
    const { user } = useUserContext()
    const { timeZone } = useSettingsContext()

    const getProfesionalEvents = async () => {
        try {
            const day = getStringDateInTimeZone(date, UTC)
            const startTime = new Date(`${day}T00:00:00${timeZone.numeric}`)
            const response = await profesionalServices.getProfesionalEvents(idProfesional, startTime)

            const groupEvents = {}

            response.data.forEach(event => {
                if (groupEvents[event.type] === undefined) {
                    groupEvents[event.type] = []
                }
                groupEvents[event.type].push(event)
            })

            if (response.status === 200) {
                //setEvents(response.data)
                setEvents(groupEvents)
            }
        } catch (error) {
            return error.response
        }
    }

    const createTurnEvent = async (newTurn) => {
        try {
            const data = {
                ...newTurn,
                createdBy: user.id,
                idProfesional: idProfesional
            }

            const response = await turnServices.createTurn(data)

            if (response.status === 201) {
                getProfesionalEvents()
            }
            
            return response
        } catch (error) {
            return error.response
        }
    }

    const updateTurnEvent = async (id, editedTurn) => {
        try {
            const data = {
                ...editedTurn,
                modifiedBy: user.id,
                //idProfesional: idProfesional
            }

            const response = await turnServices.updateTurn(id, data)

            if (response.status === 200) {
                getProfesionalEvents()
            }
            
            return response
        } catch (error) {
            return error.response
        }
    }

    const deleteTurnEvent = async (id) => {
        try {
            const response = await turnServices.deleteTurn(id)

            if (response.status === 200) {
                getProfesionalEvents()
            }
            
            return response
        } catch (error) {
            return error.response
        }
    }

    const createExceptionEvent = async (newException) => {
        try {
            const data = {
                ...newException,
                createdBy: user.id,
                idProfesional: idProfesional
            }

            const response = await exceptionServices.createException(data)

            if (response.status === 201) {
                getProfesionalEvents()
            }
            
            return response
        } catch (error) {
            return error.response
        }
    }

    const updateExceptionEvent = async (id, editedException) => {
        try {
            const data = {
                ...editedException,
                modifiedBy: user.id,
            }

            const response = await exceptionServices.updateException(id, data)

            if (response.status === 200) {
                getProfesionalEvents()
            }
            
            return response
        } catch (error) {
            return error.response
        }
    }

    const deleteExceptionEvent = async (id) => {
        try {
            const response = await exceptionServices.deleteException(id)

            if (response.status === 200) {
                getProfesionalEvents()
            }
            
            return response
        } catch (error) {
            return error.response
        }
    }

    /* Reminders */

    const createReminderEvent = async (newReminder) => {
        try {
            const data = {
                ...newReminder,
                createdBy: user.id,
                idProfesional: idProfesional
            }

            const response = await reminderServices.createReminder(data)

            if (response.status === 201) {
                getProfesionalEvents()
            }
            
            return response
        } catch (error) {
            return error.response
        }
    }

    const updateReminderEvent = async (id, editedReminder) => {
        try {
            const data = {
                ...editedReminder,
                modifiedBy: user.id,
                //idProfesional: idProfesional
            }

            const response = await reminderServices.updateReminder(id, data)

            if (response.status === 200) {
                getProfesionalEvents()
            }
            
            return response
        } catch (error) {
            return error.response
        }
    }

    const deleteReminderEvent = async (id) => {
        try {
            const response = await reminderServices.deleteReminder(id)

            if (response.status === 200) {
                getProfesionalEvents()
            }
            
            return response
        } catch (error) {
            return error.response
        }
    }

    const confirmTurnEvent = async (id) => {
        try {
            const response = await turnServices.confirmTurn(id)

            if (response.status === 200) {
                getProfesionalEvents()
            }
            
            return response
        } catch (error) {
            return error.response
        }
    }

    useEffect(() => {
        getProfesionalEvents()
    }, [idProfesional, date])

    const operations = {
        turns: {
            create: createTurnEvent,
            update: updateTurnEvent,
            delete: deleteTurnEvent,
            confirm: confirmTurnEvent
        },
        exceptions: {
            create: createExceptionEvent,
            update: updateExceptionEvent,
            delete: deleteExceptionEvent
        },
        reminders: {
            create: createReminderEvent,
            update: updateReminderEvent,
            delete: deleteReminderEvent
        }
    }

    return {
        events,
        operations,
    }
}

export default useProfesionalEvents