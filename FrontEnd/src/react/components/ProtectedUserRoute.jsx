import { Navigate, Outlet } from "react-router-dom"
import { RoutesNavigation } from "../constants/RoutesNavigation"
import { useUserContext } from "./providers/UserProvider"
import useCheckIsAuthorized from "./hooks/useCheckIsAuthorized"

const ProtectedUserRoute = () => {
  const { user } = useUserContext()
  console.log(user)
  // Guarda obligatoria: `user` es undefined si no hay sesión -> evita el crash `reading 'id'`
  const { loading, isAuthorized } = useCheckIsAuthorized(user ? user['id'] : undefined)
  console.log(isAuthorized)

    //   if (!user) {
    //     return <Navigate to={RoutesNavigation.Login} replace />
    //   }
    
    //   return <Outlet />

    return (
      <>{loading ? 'cargando...' : !user ? <Navigate to={RoutesNavigation.Login} replace /> : isAuthorized ? <Outlet /> : <Navigate to={RoutesNavigation.Login} replace />}</>
    )
}

export default ProtectedUserRoute
