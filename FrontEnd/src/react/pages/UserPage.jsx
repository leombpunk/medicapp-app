import { useParams } from 'react-router-dom';
import { Loading } from '../components/basis';
import UserData from '../components/user/UserData';
import useUser from '../components/hooks/useUser';
import NotFoundPage from './NotFound';

const UserPage = () => {
    const { id: idUser } = useParams()
    const { loading, user, saveUser, deleteUser, activateUser } = useUser(idUser)

    return (
        <>
            {
                loading ?
                    <Loading/>
                :
                    user ?
                        <>
                            <UserData user={user} handleSaveUser={saveUser} handleDeleteUser={deleteUser} handleActivateUser={activateUser}/>
                        </>
                    : <NotFoundPage/>
            }
        </>
    )
}

export default UserPage