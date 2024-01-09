import { useEffect, useState } from 'react'
import { useUserContext } from '../providers/UserProvider'
import { blobToBase64 } from '../constants/blob'
import fileServices from '../services/files'

const usePhoto = (data) => {
    const [isLoading, setIsLoading] = useState(false)
    const [photo, setPhoto] = useState(undefined)
    const { getUserToken } = useUserContext()

    const getPhoto = async () => {
        try {
            setIsLoading(true)
            const userToken = getUserToken()
            const response = await fileServices.getFile(userToken, data)
            const objectURL = await blobToBase64(response)
            setPhoto({ image: objectURL })
        } catch (error) {
            console.log({ error })
        } finally {
            setIsLoading(false)
        }
    }

    const handleDownload = () => {
        const userToken = getUserToken()
        fileServices.downloadFile(userToken, data)
    }


    useEffect(() => {
        getPhoto()
    }, [data])

    return {
        isLoading,
        photo,
        handleDownload
    }
}

export default usePhoto