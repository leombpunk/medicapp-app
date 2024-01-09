const getToken = () => {
    const userJSON = localStorage.getItem('medicappLoggedUser')

    if (userJSON) {
        const user = JSON.parse(userJSON)
        return `Bearer ${user.token}`
    }
}

const deleteToken = () => {
    localStorage.removeItem('medicappLoggedUser');
};

export { getToken, deleteToken }