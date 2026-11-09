import { createContext, useContext, useState } from "react";

const topbarContext = createContext()
const topbarTitleContext = createContext()

const TopbarProvider = ({children}) => {
    const [title, setTitle] = useState([])

    return (
        <topbarContext.Provider value={title}>
            <topbarTitleContext.Provider value={setTitle}>
                {children}
            </topbarTitleContext.Provider>
        </topbarContext.Provider>
    )
}

const useTopbarContext = () => {
    return useContext(topbarContext)
}

const useHandleTopbarTitleContext = () => {
    return useContext(topbarTitleContext)
}

export { TopbarProvider, useTopbarContext , useHandleTopbarTitleContext}