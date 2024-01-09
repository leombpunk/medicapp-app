import { createContext, useContext, useState } from "react";

const sidebarContext = createContext()

const SidebarProvider = ({children}) => {
    const [patient, setPatient] = useState(undefined)
    const [schedule, setSchedule] = useState(undefined)

    return (
        <sidebarContext.Provider value={{ patient, handlePatient: setPatient, schedule, handleSchedule: setSchedule }}>
            {children}
        </sidebarContext.Provider>
    )
}

const useSidebarContext = () => {
    return useContext(sidebarContext)
}

export { SidebarProvider, useSidebarContext }