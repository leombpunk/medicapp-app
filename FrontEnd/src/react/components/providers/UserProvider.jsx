import { createContext, useContext, useState } from "react";
import userServices from "../../services/auth";

const userContext = createContext()

const UserProvider = ({children}) => {
    //agregar un estado mas para cuando el fetch tenga status 401 que el componente
    //que usa este custom hook borre el token del localStorage emita un mensaje y 
    //devuelva al usuario a la pantalla de inicio de sesion
    const [user, setUser] = useState(undefined)

    const handleLogIn = (user) => {
        setUser(user)
        localStorage.setItem('medicappLoggedUser', JSON.stringify(user))
    }

    const handleLogOut = () => {
        localStorage.removeItem('medicappLoggedUser')
        setUser(undefined)
    }

    const handleUpdateLogin = async () => {
        try {
            const request = await userServices(user)
            setUser(user)
            localStorage.setItem('medicappLoggedUser', JSON.stringify(user))
        } catch (error) {
            return error.response
        }
    }

    const medicappLoggedUser = localStorage.getItem('medicappLoggedUser')

    if (!user && medicappLoggedUser) {
        try {
            const userData = JSON.parse(medicappLoggedUser)
            setUser(userData)
        } catch (error) {
            //Do nothing
        }
    }

    return (
        <userContext.Provider value={{ user, handleLogIn, handleLogOut }}>
            {children}
        </userContext.Provider>
    )
}

const useUserContext = () => {
    return useContext(userContext)
}

export { UserProvider, useUserContext }