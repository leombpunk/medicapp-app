import { useEffect, useState } from "react"
import userServices from "../../services/users"

const useUser = (idUser) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(undefined)
    
    const getUser = async () => {
        try {
            setLoading(true)
            const result = await userServices.getUser(idUser)
            setUser(result.data.data)
        } catch (error) {
            console.log(error.request.status)
        } finally {
            setLoading(false)
        }
    }

    const saveUser = async (data) => {
        const request = await userServices.updateUserPut(idUser, data)
        if (request.status === 200) {
            getUser()
        }
        return request
    }

    const deleteUser = async () => {
        const request = await userServices.deleteUser(idUser)
        if (request.status === 200) {
            getUser()
        }
        return request
    }

    const activateUser = async () => {
        const request = await userServices.activateUser(idUser)
        if (request.status === 200) {
            getUser()
        }
        return request
    }

    useEffect(() => {
        getUser()
    }, [idUser])

    return { 
        loading, 
        user, 
        saveUser,
        deleteUser,
        activateUser,
    }
}

export default useUser