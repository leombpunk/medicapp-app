const getDefaultScheduleConf = (idProfesional) => {
    return {
        id: null,
        id_profesional: idProfesional,
        configuration: [
            {id: 0, enabled: false, "times": []},
            {id: 1, enabled: false, "times": []},
            {id: 2, enabled: false, "times": []},
            {id: 3, enabled: false, "times": []},
            {id: 4, enabled: false, "times": []},
            {id: 5, enabled: false, "times": []},
            {id: 6, enabled: false, "times": []}
        ],
        turns: [],
        exceptions: []
    }
}

export { getDefaultScheduleConf }