import { useEffect, useState } from "react"
import { TIMEZONES, getStringTimeInTimeZone } from "../../constants/constants"
import { ORDER } from '../../constants/constants'
import turnServices from "../../services/turns"

const useHomeTurns = () => {
  const [loaging, setLoading] = useState(false)
  const [turnsList, setTurnsList] = useState([])
  const [order, setOrder] = useState({ dateTime: ORDER.Ascending })
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [profesionalId, setProfesionalId] = useState(0)
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-CA", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
  )

  const handleOrder = (row, value) => {
    const newOrder = {}
    newOrder[row] = value
    setOrder(newOrder)
}

  const handleDate = (e) => {
    const newStartDate = e.target.value
    setDate(newStartDate)
    setPage(1)
  }

  const handleProfesionalId = (e) => {
    const id = e.target.value
    setProfesionalId(id)
    setPage(1)
  }

  const fetchTurns = async () => {
    try {
      setLoading(true)
      const tableOrder = Object.keys(order).map(key => [key, order[key]])
      const result = await turnServices.getTurns({ startTime: date, idProfesional: profesionalId, page, order: tableOrder })
      // console.log(result)
      if (result.status === 200) {
        setTotalPages(result.total_pages)
        setTurnsList(
          result.data.map((turn) => {
            return {
              profesional: `${turn.profesional.names} ${turn.profesional.surnames}`,
              patient: `${turn.patient.names} ${turn.patient.surnames}`,
              time: getStringTimeInTimeZone(
                new Date(turn.dateTime),
                TIMEZONES[0]
              ),
              duration: getStringTimeInTimeZone(
                new Date(`2000-01-01T${turn.duration}`),
                TIMEZONES[0]
              ),
              description: turn.description,
            }
          })
        )
        setLoading(false)
      } else {
        setTurnsList([])
        setTotalPages(0)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      setTurnsList([])
      setTotalPages(0)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTurns()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, profesionalId, page, order])

  return {
    loaging,
    date,
    turnsList,
    order,
    page, 
    totalPages,
    handleDate,
    handleProfesionalId,
    handlePage: setPage,
    handleOrder,
  }
}

export default useHomeTurns