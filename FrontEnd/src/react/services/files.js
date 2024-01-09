import axios from "axios";
import { RouteAPI } from "../constants/RoutesAPI"
import { getToken } from "../constants/token"
import fileDownload from "js-file-download"

const uploadFile = async (data) => {
    /*
    const token = getToken()

    const config = {
        headers: {
            Authorization: token
        }
    }

    const response = await axios.post(RouteAPI.Files, data, config)
    const result = response.data
    return result
    */
    const token = getToken()

    const config = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: data
    }
    const URL = RouteAPI.Files
    const response = await fetch(URL, config)
    const result = await response.json()
    return result
}

const updateFile = async (idFile, data) => {
    /*
    const token = getToken()

    const config = {
        headers: {
            Authorization: token
        }
    }

    const url = `${RouteAPI.Files}/${idFile}`
    const response = await axios.patch(url, data, config)
    const result = response.data
    return result
    */
    const token = getToken()

    const config = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            //'Content-Type': 'application/json'
        },
        body: data
    }
    const URL = `${RouteAPI.Files}/${idFile}`
    const response = await fetch(URL, config)
    const result = await response.json()
    return result
}

const deleteFile = async (idFile) => {
    /*
    const token = getToken()

    const config = {
        headers: {
            Authorization: token
        }
    }

    const url = `${RouteAPI.Files}/${id}`
    const request = axios.delete(url, config)
    return request
    */
    const token = getToken()

    const config = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }
    const URL = `${RouteAPI.Files}/${idFile}`
    const response = await fetch(URL, config)
    const result = await response.json()
    return result
}

const getFile = async (file) => {
    const token = getToken()

    const url = `${RouteAPI.Files}/${file.filename}`
    const request = await axios({
        url: url,
        method: 'GET',
        responseType: 'blob',
        headers: {
            Authorization: token
        }
    })
    fileDownload(request.data, file.name)
}

const getPhoto = (photo) => {
    const token = getToken()

    const url = `${RouteAPI.Files}/${photo.filename}`
    const request = axios({
        url: url,
        method: 'GET',
        responseType: 'blob',
        headers: {
            Authorization: token
        }
    })

    return request
}

const getThumbnail = (photo) => {
    const token = getToken()

    const url = `${RouteAPI.Files}/thumbnail/${photo.filename}`
    const request = axios({
        url: url,
        method: 'GET',
        responseType: 'blob',
        headers: {
            Authorization: token
        }
    })

    return request
}

const fileServices =  { uploadFile, updateFile, deleteFile, getFile, getPhoto, getThumbnail }

export default fileServices