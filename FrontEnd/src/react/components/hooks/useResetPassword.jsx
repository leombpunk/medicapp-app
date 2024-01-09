import { useState } from "react"
import { useForm } from "react-hook-form"
import userServices from "../../services/auth"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaResetPassword } from "../../constants/schemasValidations"

const useResetPassword = () => {
    const formManager = useForm({ resolver: yupResolver(schemaResetPassword) })
    const [isLoading, setIsLoading] = useState(false)
    const [isConfirmed, setIsConfirmed] = useState(false)

    const handleConfirm = async (data) => {
        try {
            setIsLoading(true)
            const response = await userServices.resetPassword({ mail: data.mail })
            console.log({ response })
            setIsConfirmed(true)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        isConfirmed,
        formManager: { ...formManager, handleSubmit: formManager.handleSubmit(handleConfirm), errors: formManager.formState.errors }
    }
}

export default useResetPassword