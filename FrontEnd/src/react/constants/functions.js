/*
const isTheSameDate = (dateOne, dateTwo, timeZone) => {
    return getStringDateInTimeZone(dateOne, timeZone) === getStringDateInTimeZone(dateTwo, timeZone)
}

const getMonthsInYear = (year, timeZone) => {
    return [
        new Date(`${year}-01-01T00:00:00${timeZone.numeric}`),
        new Date(`${year}-02-01T00:00:00${timeZone.numeric}`),
        new Date(`${year}-03-01T00:00:00${timeZone.numeric}`),
        new Date(`${year}-04-01T00:00:00${timeZone.numeric}`),
        new Date(`${year}-05-01T00:00:00${timeZone.numeric}`),
        new Date(`${year}-06-01T00:00:00${timeZone.numeric}`),
        new Date(`${year}-07-01T00:00:00${timeZone.numeric}`),
        new Date(`${year}-08-01T00:00:00${timeZone.numeric}`),
        new Date(`${year}-09-01T00:00:00${timeZone.numeric}`),
        new Date(`${year}-10-01T00:00:00${timeZone.numeric}`),
        new Date(`${year}-11-01T00:00:00${timeZone.numeric}`),
        new Date(`${year}-12-01T00:00:00${timeZone.numeric}`),
    ]
}

const getWeeksInMonth = (year, month) => {
    const weeks = []
    const firstDate = new Date(year, month, 1)
    const lastDate = new Date(year, month + 1, 0)

    const weeksCount = Math.ceil((firstDate.getDay() + lastDate.getDate()) / 7)

    if (firstDate.getDay() !== 0) {
        firstDate.setDate(firstDate.getDate() - firstDate.getDay())
    }

    if (lastDate.getDay() !== 6) {
        lastDate.setDate(lastDate.getDate() + (6 - lastDate.getDay()))
    }

    const date = firstDate

    for (let week = 0; week < weeksCount; week++) {
        const weeksDays = []
        for (let day = 0; day < 7; day++) {
            weeksDays.push(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
            date.setDate(date.getDate() + 1)
        }
        weeks.push(weeksDays)
    }

    return weeks
}
*/

const isTheSameDate = (dateOne, dateTwo) => {
    return (
        dateOne.getUTCFullYear() === dateTwo.getUTCFullYear() &&
        dateOne.getUTCMonth() === dateTwo.getUTCMonth() &&
        dateOne.getUTCDate() === dateTwo.getUTCDate()
    )
}

const getYears = () => {
    const now = new Date(Date.now())
    const firstYear = 1950
    const lastYear = now.getUTCFullYear()
    
    const years = []

    for (let index = firstYear; index <= lastYear; index++) {
        years.push(index)
    }

    return years.sort((a, b) => a > b ? -1 : 1)
}

const getMonthsInYear = (year) => {
    return [
        new Date(Date.UTC(year, 1, 1)),
        new Date(Date.UTC(year, 2, 1)),
        new Date(Date.UTC(year, 3, 1)),
        new Date(Date.UTC(year, 4, 1)),
        new Date(Date.UTC(year, 5, 1)),
        new Date(Date.UTC(year, 6, 1)),
        new Date(Date.UTC(year, 7, 1)),
        new Date(Date.UTC(year, 8, 1)),
        new Date(Date.UTC(year, 9, 1)),
        new Date(Date.UTC(year, 10, 1)),
        new Date(Date.UTC(year, 11, 1)),
        new Date(Date.UTC(year, 12, 1)),
    ]
}

const getWeeksInMonth = (year, month) => {
    const weeks = []
    const firstDate = new Date(Date.UTC(year, month, 1))
    const lastDate  = new Date(Date.UTC(year, month + 1, 0))

    const weeksCount = Math.ceil((firstDate.getUTCDay() + lastDate.getUTCDate()) / 7)

    if (firstDate.getUTCDay() !== 0) {
        firstDate.setUTCDate(firstDate.getUTCDate() - firstDate.getUTCDay())
    }

    if (lastDate.getUTCDay() !== 6) {
        lastDate.setUTCDate(lastDate.getUTCDate() + (6 - lastDate.getUTCDay()))
    }

    const date = firstDate

    for (let week = 0; week < weeksCount; week++) {
        const weeksDays = []
        for (let day = 0; day < 7; day++) {
            weeksDays.push(new Date(date))
            date.setUTCDate(date.getUTCDate() + 1)
        }
        weeks.push(weeksDays)
    }

    return weeks
}

const getSecondsOfTime = (time) => {
    const [hours, minutes] = time.split(':')
    return (Number(hours) * 60 + Number(minutes)) * 60
}

const getDatesInMonth = (year, month) => {
    const date = new Date(Date.UTC(year, month, 1))
    const days = []

    while (date.getUTCMonth() === month) {
        days.push(new Date(date.toISOString()))
        date.setUTCDate(date.getUTCDate() + 1)
    }

    return days
}

export {
    isTheSameDate,
    getMonthsInYear,
    getWeeksInMonth,
    getDatesInMonth,
    getSecondsOfTime
}