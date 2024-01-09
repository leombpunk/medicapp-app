import { UserCircleIcon } from "@heroicons/react/24/solid"
import { useNavigate } from "react-router-dom"

function SchedulesTable({elements, route}) {
    const navigate = useNavigate()

    return (
        <>
            <div className="d-flex flex-wrap gap-4">
                {
                elements.map((element, index) =>
                    <div 
                        key={index}
                        className="card shadow profesional-card hover-clickable"
                        style={{ width: "10rem", height: "8rem" }}
                        onClick={() => navigate(`${route}/${element.id}`)}
                    >
                        <div className="d-flex flex-column justify-content-center align-items-center m-auto">
                            <div style={{width: "4rem", height: "4rem"}}>
                                <UserCircleIcon/>
                            </div>
                            <div key={index}>
                                {element.surnames} {element.names}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default SchedulesTable