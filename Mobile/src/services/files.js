import { RouteAPI } from '../constants/RoutesAPI'
import fileDownload from 'js-file-download'

const getThumbnail = async (userToken, photo) => {
    const url = `${RouteAPI.Files}/thumbnail/${photo.filename}`

    const config = {
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-type': 'application/json'
        }
    }

    const response = await fetch(url, config)
    const result = await response.blob()
    return result
}

const getFile = async (userToken, photo) => {
    const url = `${RouteAPI.Files}/${photo.filename}`

    const config = {
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-type': 'application/json'
        }
    }

    const response = await fetch(url, config)
    const result = await response.blob()
    return result
}

const downloadFile = async (userToken, file) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-type': 'application/json'
        }
    }

    const url = `${RouteAPI.Files}/${file.filename}`
    const response = await fetch(url, config)
    const result = await response.blob()
    fileDownload(result, file.name)
}

const fileServices = { getThumbnail, getFile, downloadFile }

export default fileServices