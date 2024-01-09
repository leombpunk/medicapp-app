const timeValidator = (request, response, next) => {
    const workdays = request.body.workdays
    
    //valida que la hora de inicio sea menor que la de fin
    workdays.forEach((workday) =>{
        workday.worktimes.forEach((worktime) =>{
            const startTime = new Date(`1970-01-01T${worktime.startTime}`)
            const endTime = new Date(`1970-01-01T${worktime.endTime}`)

            if (startTime > endTime) {
                console.log(`Error en el día ${workday.idDays}: el horario de inicio debe ser menor que el horario de fin.`)
                return response.status(500).send({ 
                    message: `Error en el día ${workday.idDays}: el horario de inicio debe ser menor que el horario de fin.`, 
                    data: request.body 
                })
            }
        })
    })

    //valida que no se solapen las horas 
    workdays.forEach((workday) => {
        workday.worktimes.forEach((worktime, index) => {
            const currentStartTime = new Date(`1970-01-01T${worktime.startTime}`)
            const currentEndTime = new Date(`1970-01-01T${worktime.endTime}`)

            for (let i = index + 1; i < workday.worktimes.length; i++) {
                const compareStartTime = new Date(`1970-01-01T${workday.woktimes[i].startTime}`)
                const compareEndTime = new Date(`1970-01-01T${workday.woktimes[i].endTime}`)

                if ((currentStartTime <= compareEndTime && currentEndTime >= compareStartTime) ||
                    (currentStartTime >= compareStartTime && currentEndTime <= compareEndTime)) {
                    console.log(`Error en el día ${workday.idDays}: las franjas horarias se solapan.`)
                    return response.status(500).send({
                        message: `Error en el día ${workday.idDays}: las franjas horarias se solapan.`,
                        data: request.body
                    })
                }
            }
        })
    })

    next()
}

export { timeValidator }