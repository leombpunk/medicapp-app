import { useNavigate } from "react-router-dom"
import { useHandleTopbarTitleContext } from "../providers/TopbarProvider"

const useCustomNavigate = () => {
    const navigate = useNavigate()
    const handleTopbarTitle = useHandleTopbarTitleContext()

    const navigateToURL = (URL, title) => {
        navigate(URL)
        handleTopbarTitle(title ? title : '')
    }

    return { navigateToURL }
}

export default useCustomNavigate