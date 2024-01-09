const monthES = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
]

const dayES = [
    "domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sábado"
]

const TIMEZONES = [
    { string: "America/Argentina/Buenos_Aires", numeric: "-03:00", description: "Buenos Aires (GMT -03:00)"},
    { string: "UTC", numeric: "-00:00", description: "Tiempo Universal (GMT 00:00)"},
]

const UTC = TIMEZONES[1]

const localeStringNumericDate = (timeZone) => {
    return {
        year: "numeric",
        month: "2-digit",
        day:"2-digit",
        //timeZoneName: "short",
        timeZone,
        //timeZone: "America/Argentina/Buenos_Aires"
    }
}

const localeStringNumericTime = (timeZone) => {
    return {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        //timeZoneName: "short",
        timeZone
        //timeZone: "America/Argentina/Buenos_Aires"
    }
}

const localeStringDate = (timeZone) => {
    return {
        year: "numeric",
        month: "long",
        day:"numeric",
        //timeZoneName: "short",
        timeZone
        //timeZone: "America/Argentina/Buenos_Aires",
    }
}

const localeStringTime = (timeZone) => {
    return {
        hour: "2-digit",
        minute: "2-digit",
        //timeZoneName: "short",
        timeZone
        //timeZone: "America/Argentina/Buenos_Aires",
    }
}

const localeStringDateTime = {
    year: "numeric",
    month: "long",
    day:"numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "America/Argentina/Buenos_Aires",
    timeZoneName: "short"
}

const sortsObjects = (objects, atribute, order) => {
    return objects.sort((a, b) => (a[atribute] > b[atribute]) ? 1 * order : (a[atribute] < b[atribute]) ? -1 * order : 0)
}

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

const ORDER = {
    Ascending: 'ASC',
    Descending: 'DESC'
}

export { 
    dayES,
    monthES,
    localeStringNumericDate,
    localeStringDate,
    localeStringNumericTime,
    localeStringTime,
    localeStringDateTime,
    getStringDateInTimeZone,
    getStringTimeInTimeZone,
    getStringDateInLanguageTimeZone,
    getStringDateTimeInLanguageTimeZone,
    TIMEZONES,
    UTC,
    ORDER
}