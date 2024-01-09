import { useState } from 'react'

const usePassword = () => {
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(show => !show)
    }

    return {
        showPassword,
        toggleShowPassword
    }
}

export default usePassword