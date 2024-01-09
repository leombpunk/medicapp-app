const MONTH_ES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
]

const DAY_ES = [
  "domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sábado"
]


const TIMEZONES = [
  { string: 'America/Argentina/Buenos_Aires', numeric: '-03:00', description: 'Buenos Aires (GMT -03:00)'},
  { string: 'UTC', numeric: '-00:00', description: 'Tiempo Universal (GMT 00:00)'},
]

const BuenosAires = TIMEZONES[0]
const UTC = TIMEZONES[1]

export {
  TIMEZONES,
  BuenosAires,
  UTC,
  MONTH_ES,
  DAY_ES
}