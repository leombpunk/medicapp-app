import { useState } from 'react'
import useModal from './useModal'

const useEventModal = () => {
    const [data, setData] = useState(undefined)
    const { show, handleOpen, handleClose } = useModal()

    const handleOpenModal = (data) => {
        setData(data)
        handleOpen()
    }

    return {
        data,
        show,
        handleOpen: handleOpenModal,
        handleClose,
    }
}

export default useEventModal