import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userServices from "../../services/users";
import { useNotificationsContext } from "../providers/NotificationsProvider";

const useCheckIsAuthorized = (idUser) => {
  const [loading, setLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(undefined)
  const navigate = useNavigate()
  const { addNotification } = useNotificationsContext()

  const checkIsAuthorized = async () => {
    try {
      setLoading(true)
      const result = await userServices.getUser(idUser)
      console.log(result)
      setIsAuthorized(result)
    } catch (error) {
      console.log(error.request.status)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Sin idUser (sin sesión) no se consulta la API: redirect lo maneja ProtectedUserRoute
    if (!idUser) {
      setLoading(false)
      return
    }
    checkIsAuthorized()
  }, [idUser])

  return {
    loading,
    isAuthorized,
  }
}

export default useCheckIsAuthorized
