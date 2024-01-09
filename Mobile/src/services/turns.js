import { RouteAPI } from '../constants/RoutesAPI'

const getAllTurns = async (userToken, idPatient, page) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-type': 'application/json'
        }
    }
    const params = new URLSearchParams({
        page: page ?? 1,
        idPatient: idPatient ?? '',
        //idProfesional: idProfesional ?? '',
        //idTreatment: idTreatment ?? '',
    })

    const url = `${RouteAPI.Turns}?${params.toString()}`
    const response = await fetch(url, config)
    const result = await response.json()
    return result
}

const turnServices = { getAllTurns }

export default turnServices