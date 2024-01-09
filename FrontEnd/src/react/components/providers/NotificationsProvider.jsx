import { createContext, useContext, useState } from 'react'
import Notification from '../basis/Notification'
import { Notifications } from '../basis'

const notificationsContext = createContext()

const NotificationsProvider = ({children}) => {
    const [notifications, setNotifications] = useState([])

    const addNotification = (message, type) => {
        const notification = <Notification key={Date.now()} message={message} type={type}/>

        setNotifications([
            ...notifications,
            notification
        ])
    }

    return (
        <notificationsContext.Provider value={{ notifications, addNotification }}>
            {children}
            <Notifications/>
        </notificationsContext.Provider>
    )
}

const useNotificationsContext = () => {
    return useContext(notificationsContext)
}

export { NotificationsProvider, useNotificationsContext }