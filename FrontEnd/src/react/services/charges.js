import axios from 'axios'
import { RouteAPI } from '../constants/RoutesAPI'
import { getToken } from '../constants/token'

const getAllCharges = () => {
    /*
    const token = getToken()
    const config = {
        headers: {
            Authorization: token
        }
    }
    */
    const url = `${RouteAPI.Charges}`
    const request = axios.get(url)
    return request
}

const getAllChargesSearcher = (search, page, order) => {
    const token = getToken()

    const config = {
        headers: {
            Authorization: token
        }
    }

    const params = new URLSearchParams({
        search: search ?? '',
        page: page ?? 1,
        order: JSON.stringify(order ?? []),
    })

    const url = `${RouteAPI.Charges}/search?${params.toString()}`
    const request = axios.get(url, config)
    return request.then(response => response)
}

const getCharge = async (id) => {
    const token = getToken()
    const config = {
        headers: {
            Authorization: token
        }
    }
    const url = `${RouteAPI.Charges}/${id}`
    const request = axios.get(url, config)
    return request.then(response => response)
}

const createCharge = async (data) => {
    const token = getToken()

    const config = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const URL = RouteAPI.Charges
    const response = await fetch(URL, config)
    const result = await response.json()
    return result
}

const updateCharge = async (idCharge, data) => {
    const token = getToken()

    const config = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const URL =`${RouteAPI.Charges}/${idCharge}`
    const response = await fetch(URL, config)
    const result = await response.json()
    return result
}

const deleteCharge = async (id) => {
    const token = getToken()
    const config = {
        headers: {
            Authorization: token
        }
    }
    const url = `${RouteAPI.Charges}/${id}`
    const request = axios.delete(url, config)
    return request.then(response => response)
}

const chargeServices = { getAllChargesSearcher, getAllCharges, getCharge, createCharge, updateCharge, deleteCharge }
export default chargeServices