import { useUserContext } from '../providers/UserProvider'
import { useNavigate } from 'react-router-dom'
import { RoutesNavigation } from '../../constants/RoutesNavigation'
import UserData from '../profile/UserData'
import ProfilePass from '../profile/ProfilePass'
import { Button } from '../basis'
import { NoSymbolIcon, PowerIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import userServices from '../../services/users'
import { useNotificationsContext } from '../providers/NotificationsProvider'
import TurnOffUserModal from '../user/TurnOffUser'
import { useModal } from '../hooks'

const Profile = () => {
    const { user } = useUserContext()
    const { addNotification } = useNotificationsContext()
    const navigate = useNavigate()
    const { handleLogOut } = useUserContext()
    const {show, handleOpen, handleClose } = useModal()
    const [isLoading, setIsLoading] = useState(false)

    const logOut = () => {
        handleLogOut()
        navigate(RoutesNavigation.Home)
    }

    const handleOffUser = async () => {
        try {
            setIsLoading(true)
            const idUser = user.id
            const response = await userServices.deleteUser(idUser)
            if (response.status === 200) {
                addNotification('Cuenta suspendida exitosamente.', 'success')
                logOut()
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <UserData/>
            <hr/>
            <ProfilePass/>
            <TurnOffUserModal show={show} handleClose={handleClose} handleConfirm={handleOffUser} isLoading={isLoading}/>
            <div className='d-flex justify-content-between gap-2'>
                <Button
                    className='btn-primary'
                    Icon={PowerIcon}
                    text='Cerrar Sesión'
                    handleOnClick={logOut}
                />

                <Button
                    className='btn-danger'
                    Icon={NoSymbolIcon}
                    text='Suspender cuenta'
                    handleOnClick={handleOpen}
                />
            </div>
        </>
    )
}

export default Profile