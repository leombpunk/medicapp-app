import { useEffect, useState } from "react";
import roleServices from "../../services/roles";

const useRoles = () => {
    const [loading, setLoading] = useState(false)
    const [roles, setRoles] = useState([])

    const getAllRoles = async () => {
        try {
            setLoading(true)
            const response = await roleServices.getAllRoles()
            const result = response.data
            if (result.status === 200) {
                setRoles(result.data)
            }
        } catch (error) {
            console.log({ error })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllRoles()
    }, [])

    return {
        loading,
        roles
    }
}

export default useRoles