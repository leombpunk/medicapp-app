import { createContext, useContext } from 'react'
import useScheduleEventModal from '../hooks/useScheduleEventModal'

const scheduleContext = createContext()

const ScheduleProvider = ({ children }) => {
    const modal = useScheduleEventModal()

    return (
        <scheduleContext.Provider value={modal}>
            {children}
        </scheduleContext.Provider>
    )
}

const useScheduleContext = () => {
    return useContext(scheduleContext)
}

export { ScheduleProvider, useScheduleContext }