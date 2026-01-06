const prefix = '/medicapp' //for Dev enviroment or Local deploy
// const prefix = '/app' //for Producction enviroment

const RoutesNavigation = {
    Login: `${prefix}/login`,
    Register: `${prefix}/register`,
    Home: `${prefix}/`,
    Schedules: `${prefix}/schedules`,
    Schedule: `${prefix}/schedules/:id`,
    Profesionals: `${prefix}/profesionals`,
    Profesional: `${prefix}/profesionals/:id`,
    ProfesionalStats: `${prefix}/profesionals/:id/stats`,
    Patients: `${prefix}/patients`,
    Patient: `${prefix}/patients/:id`,
    Turns: `${prefix}/turns`,
    Profile: `${prefix}/profile`,
    Users: `${prefix}/configuration/users`,
    User: `${prefix}/configuration/users/:id`,
    // Test: `${prefix}/test`,
    Treatments: `${prefix}/treatments`,
    Configurations: `${prefix}/configuration`,
    Configuration: `${prefix}/configuration/:tab`,
    ScheduleSettings: `${prefix}/configuration/schedule`,
    ScheduleSetting: `${prefix}/configuration/schedule/:idProfesional`,
    Charges: `${prefix}/configuration/charges`,
    Charge: `${prefix}/configuration/charges/:id`
}

export { RoutesNavigation }