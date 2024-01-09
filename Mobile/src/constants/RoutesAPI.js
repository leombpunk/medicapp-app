const baseAPI = 'http://192.168.0.70:3001'

const RouteAPI = {
    Login: `${baseAPI}/auth/login`,
    Register: `${baseAPI}/auth/register`,
    Profesionals: `${baseAPI}/profesionals`,
    Patients: `${baseAPI}/patients`,
    Files: `${baseAPI}/files`,
    Turns: `${baseAPI}/turns`,
    Users: `${baseAPI}/users`,
    Roles: `${baseAPI}/roles`,
    Charges: `${baseAPI}/charges`,
    Schedule: `${baseAPI}/schedule`,
}

export { RouteAPI }