const filterUsers = (users, string) => {
    return users.filter(
        user => user.name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().includes(string.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase())
    )
}

export { filterUsers }