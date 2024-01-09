import { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const userContext = createContext()

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(undefined)

    const handleLogIn = async (user) => {
        try {
            setUser(user)
            await AsyncStorage.setItem('user', JSON.stringify(user))
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogOut = async () => {
        try {
            await AsyncStorage.removeItem('user')
            setUser(undefined)
        } catch (error) {
            console.log(error)
        }
    }

    const getStoragedUser = async () => {
        try {
            const storagedUser = await AsyncStorage.getItem('user')

            if (!user && storagedUser) {
                const userData = JSON.parse(storagedUser)
                setUser(userData)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getUserToken = () => {
        return user.token
    }

    useEffect(() => {
        getStoragedUser()
        //handleLogOut()
    }, [user])

    return (
        <userContext.Provider value={{ user, getUserToken, handleLogIn, handleLogOut }}>
            {children}
        </userContext.Provider>
    )
}

const useUserContext = () => {
    return useContext(userContext)
}

export { UserProvider, useUserContext }
