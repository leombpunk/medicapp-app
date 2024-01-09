import { NoSymbolIcon } from "@heroicons/react/24/solid"

const NotAllowed = () => {
    return (
        <div>
            <div className="container">
                <div className="d-flex flex-column gap-4 align-items-center justify-content-center" style={{height: "100vh - 4rem"}}>
                    <NoSymbolIcon style={{width: "4rem", height: "4rem"}}/>
                    <h3>Error</h3>
                    <div>Usted no cuenta con los privilegios para acceder a esta pagina.</div>
                </div>
            </div>
        </div>
    )
}

export default NotAllowed