import { RouteAPI } from '../constants/RoutesAPI'
import { getToken } from '../constants/token'

const getAllTreatments = async (search, page, order) => {
    const token = getToken()

    const config = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    const params = new URLSearchParams({
        search: search ?? '',
        page: page ?? 1,
        order: JSON.stringify(order)
    })

    const URL = `${RouteAPI.Treatments}?${params.toString()}`

    const response = await fetch(URL, config)
    const data = await response.json()
    return data
}

const treatmentServices = { getAllTreatments }

export default treatmentServices