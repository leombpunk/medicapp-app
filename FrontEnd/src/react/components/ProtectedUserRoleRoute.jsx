import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "./providers/UserProvider";

const ProtectedUserRoleRoute = ({route}) => {
    const { user } = useUserContext()
    const location = useLocation()

    if (user.role.id === 1 && location.pathname !== `${route}/${user.id}`) {
        return <Navigate to={`${route}/${user.id}`} replace/>
    }

    return <Outlet/>
}

export default ProtectedUserRoleRoute
  