import { useNotificationsContext } from '../providers/NotificationsProvider'

const Notifications = () => {
    const { notifications } = useNotificationsContext()

    return (
        <div className='toast-container position-fixed bottom-0 end-0 p-3'>
            {notifications}
        </div>
    )
}

export default Notifications