import { Navigate, Outlet } from "react-router-dom";
import { RoutesNavigation } from "../constants/RoutesNavigation";
import { useUserContext } from "./providers/UserProvider";

const ProtectedUserRoute = () => {
    const { user } = useUserContext()

    if (!user) {
        return <Navigate to={RoutesNavigation.Login} replace/>
    }

    return <Outlet/>
}

export default ProtectedUserRoute
  