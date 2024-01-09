const filterPatients = (patients, string) => {
    return patients.filter(
        patient => patient.name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().includes(string.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()) || patient.dni.includes(string)
    )
}

export { filterPatients }