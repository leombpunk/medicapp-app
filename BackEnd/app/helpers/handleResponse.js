const handleResponse = (response, httpStatus, message, data, errors) => {
    response.status(httpStatus).send({
        status: httpStatus,
        message,
        data,
        errors
    }).end()
}

const handleResponseCustomStatus = (response, httpStatus, status, message, data, errors) => {
    response.status(httpStatus).send({
        status,
        message,
        data,
        errors
    }).end()
}

export { handleResponse, handleResponseCustomStatus }