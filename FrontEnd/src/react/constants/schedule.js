import { UTC, getStringDateInTimeZone } from "./constants"

const getMinDateStart = (date, worktimes, timeZone) => {
    const day = getStringDateInTimeZone(date, UTC)
    let minStartTime = new Date(`${day}T23:59:00${timeZone.numeric}`)

    if (worktimes.length) {
        for (let index = 0; index < worktimes.length; index++) {
            const worktime = new Date(`${day}T${worktimes[index].startTime}${timeZone.numeric}`)
            minStartTime = minStartTime > worktime ? worktime : minStartTime
        }
    } else {
        minStartTime = new Date(`${day}T00:00:00${timeZone.numeric}`)
    }

    return minStartTime
}

const getMaxDateEnd = (date, worktimes, timeZone) => {
    const day = getStringDateInTimeZone(date, UTC)
    let maxEndTime = new Date(`${day}T00:00:00${timeZone.numeric}`)

    if (worktimes.length) {
        for (let index = 0; index < worktimes.length; index++) {
            const worktime = new Date(`${day}T${worktimes[index].endTime}${timeZone.numeric}`)
            maxEndTime = maxEndTime < worktime ? worktime : maxEndTime
        }
    } else {
        maxEndTime = new Date(`${day}T23:59:00${timeZone.numeric}`)
    }

    return maxEndTime
}

const getEventHeight = (dateStart, dateEnd, eventStart, eventEnd) => {
    const start = eventStart > dateStart ? eventStart : dateStart
    const end = eventEnd < dateEnd ? eventEnd : dateEnd
    return (Math.abs((end - start)) / 1000) / 3600
}

const getEventPositionY = (dateStart, eventStart) =>{
    const start = eventStart > dateStart ? eventStart : dateStart
    return (Math.abs((start - dateStart)) / 1000) / 3600
}

const isTimeEnabled = (time, worktimes) => {
    const start = new Date(time.toISOString())
    const end = new Date(time.toISOString())
    end.setUTCMinutes(end.getUTCMinutes() + 30)
    
    for (let index = 0; index < worktimes.length; index++) {
        if (worktimes[index].startTime <= start && end <= worktimes[index].endTime) {
            return true
        }
    }
    return false
}

const getWorktimesOfDate = (date, worktimes, timeZone) => {
    const dayWorktimes = worktimes
    
    return dayWorktimes.map(worktime => {
        const day = getStringDateInTimeZone(date, UTC)
        const startTime = new Date(`${day}T${worktime.startTime}${timeZone.numeric}`)
        const endTime = new Date(`${day}T${worktime.endTime}${timeZone.numeric}`)
        return {...worktime, startTime, endTime}
    })
}

export {
    getEventPositionY,
    getEventHeight,
    getMinDateStart,
    getMaxDateEnd,
    isTimeEnabled,
    getWorktimesOfDate
}