import axios from "axios"
import { RouteAPI } from "../constants/RoutesAPI"
import { getToken } from "../constants/token"

const getAllRoles = async () => {
    const token = getToken()
    const config = {
        headers: {
            Authorization: token
        }
    }
    const url = `${RouteAPI.Roles}`
    const request = await axios.get(url, config)
    return request
}


const roleServices = { getAllRoles }
export default roleServices