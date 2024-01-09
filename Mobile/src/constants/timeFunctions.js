import { UTC } from './time'

const getStringDateInTimeZone = (date, timeZone) => {
  const [ month, day, year ] = date.toLocaleString("en-EN", { year: "numeric", month: "2-digit", day:"2-digit", timeZone: timeZone.string }).split("/")
  return `${year}-${month}-${day}`
}

const getStringTimeInTimeZone = (date, timeZone) => {
  const time = date.toLocaleString("es-ES", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: timeZone.string })
  return time
}

const getStringDateTimeInLanguageTimeZone = (date, language, timeZone) => {
  return date.toLocaleString(
    language, 
    { 
      year: "numeric",
      month: "long",
      day:"numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: timeZone.string
    }
  )
}

const getStringDateInLanguageTimeZone = (date, language, timeZone) => {
  return date.toLocaleString(
    language, 
    { 
      year: "numeric",
      month: "long",
      day:"numeric",
      timeZone: timeZone.string
    }
  )
}

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

const getRowTimes = (start, end) => {
  const results = []
  const current = new Date(start.toISOString())
  results.push(new Date(current.toISOString()))

  while (new Date(Date.UTC(current.getUTCFullYear(), current.getUTCMonth(), current.getUTCDate(), current.getUTCHours(), current.getUTCMinutes() + 30)) < end) {
      current.setMinutes(current.getMinutes() + 30)
      results.push(new Date(current.toISOString()))
  }

  return results
}

const getStartDate = (date, worktimes, format24, timeZone) => {
  if (format24) {
      const day = getStringDateInTimeZone(date, UTC)
      return new Date(`${day}T00:00:00${timeZone.numeric}`) 
  } else {
      return getMinDateStart(date, worktimes, timeZone)
  }
}

const getEndDate = (date, worktimes, format24, timeZone) => {
  if (format24) {
      const day = getStringDateInTimeZone(date, UTC)
      return new Date(`${day}T23:59:00${timeZone.numeric}`)
  } else {
      return getMaxDateEnd(date, worktimes, timeZone)
  }
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

const getYear = (year) => {
  //const months = getMonthsInYear(year)
  const monthsOfYear = []
  /*
  months.forEach(month => {
    console.log(month.getUTCFullYear(), month.getUTCMonth())
    monthsOfYear.push(getWeeksInMonth(month.getUTCFullYear(), month.getUTCMonth()))
  })
  */

  for (let month = 0; month < 12; month++) {
    monthsOfYear.push(getWeeksInMonth(year, month))
  }

  return monthsOfYear
}

const isCurrentDate = (date, currentDate) => {
  return (
    date.getUTCFullYear() === currentDate.getUTCFullYear() &&
    date.getUTCMonth() === currentDate.getUTCMonth() &&
    date.getUTCDate() === currentDate.getUTCDate()
  )
}

export {
  getStringDateInTimeZone,
  getStringTimeInTimeZone,
  getStringDateInLanguageTimeZone,
  getStringDateTimeInLanguageTimeZone,
  getRowTimes,
  getStartDate,
  getEndDate,
  getEventPositionY,
  getEventHeight,
  getWeeksInMonth,
  getYear,
  isCurrentDate
}