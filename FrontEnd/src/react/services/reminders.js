import { RouteAPI } from '../constants/RoutesAPI'
import { getToken } from '../constants/token'

const createReminder = async (reminder) => {
    const token = getToken()

    const config = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reminder)
    }
    const URL = RouteAPI.Reminders
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const updateReminder = async (id, reminder) => {
    const token = getToken()

    const config = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reminder)
    }
    const URL = `${RouteAPI.Reminders}/${id}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const deleteReminder = async (id) => {
    const token = getToken()

    const config = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    }
    const URL = `${RouteAPI.Reminders}/${id}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const getAllReminders = async ({ page, order, startTime, endTime }) => {
    const token = getToken()

    const config = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    }

    const params = new URLSearchParams({
        page: page ?? '',
        startTime: startTime ?? '',
        endTime: endTime ?? '',
        order: JSON.stringify(order)
    })

    const URL = `${RouteAPI.Reminders}?${params.toString()}`
    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const reminderServices = { createReminder, updateReminder, deleteReminder, getAllReminders }

export default reminderServices