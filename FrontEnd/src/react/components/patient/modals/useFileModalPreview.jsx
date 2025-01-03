import { useState } from 'react'
import useModal from '../../hooks/useModal'
import fileServices from '../../../services/files'

const useFileModalPreview = () => {
    const { show, handleOpen, handleClose } = useModal()
    const [data, setData] = useState(undefined)
    
    console.log({data})
    const handleDownload = async () => {
        return await fileServices.getFile(data)
    }

    const handleOpenModalPreview = (data) => {
        setData(data)
        handleOpen()
    }

    const handleCloseModalPreview = () => {
        setData({})
        handleClose()
    }

    return {
        show,
        data,
        handleOpen: handleOpenModalPreview,
        handleClose: handleCloseModalPreview,
        handleDownload,
    }
}

export default useFileModalPreview