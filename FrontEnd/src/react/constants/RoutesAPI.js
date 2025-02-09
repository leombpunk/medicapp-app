// const baseAPI = "http://localhost:3001"
const baseAPI = "https://medicapp-app-api.vercel.app"

const RouteAPI = {
    Login: `${baseAPI}/login`,
    Register: `${baseAPI}/register`,
    Profesionals: `${baseAPI}/profesionals`,
    Patients: `${baseAPI}/patients`,
    Files: `${baseAPI}/files`,
    Turns: `${baseAPI}/turns`,
    Reminders: `${baseAPI}/reminders`,
    Exceptions: `${baseAPI}/exceptions`,
    Users: `${baseAPI}/users`,
    Roles: `${baseAPI}/roles`,
    Charges: `${baseAPI}/charges`,
    Schedule: `${baseAPI}/schedule`,
    Stats: `${baseAPI}/stats`,
    Treatments: `${baseAPI}/treatments`,
}

export { RouteAPI }