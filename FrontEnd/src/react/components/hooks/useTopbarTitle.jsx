import { useEffect } from "react"
import { useHandleTopbarTitleContext } from "../providers/TopbarProvider"

const useTopbarTitle = ({titles}) => {
    const setTopbarTitle = useHandleTopbarTitleContext()

    useEffect(() => {
        setTopbarTitle(titles)
    }, [])

    return [ setTopbarTitle ]
}

export default useTopbarTitle