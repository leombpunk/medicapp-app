import { useState } from 'react'

const useMenu = () => {
    const [showMenu, setShowMenu] = useState(false)

    const handleOpenMenu = () => {
        setShowMenu(true)
    }

    const handleCloseMenu = () => {
        setShowMenu(false)
    }

    return {
        showMenu,
        handleCloseMenu,
        handleOpenMenu
    }
}

export default useMenu