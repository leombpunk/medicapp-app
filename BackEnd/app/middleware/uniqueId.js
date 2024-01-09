const uniqueIdValidator = (request, response, next) => {
    const body = request.body
    const result = []
    body.workdays.forEach(element => {
        result.push(element.idDay)
    });
    const newSet = new Set(result)
    if (result.length !== newSet.size) {
        return response.status(500).send({ message: 'Error: unicidad de IDs en los dias de la semana', data: result })
    }
    else if  (result.length !== 7) {
        return response.status(500).send({ message: 'Error: los datos deben contener todos los dias de la semana', data: result })
    }
    else {
        next()
    }
}

export { uniqueIdValidator }