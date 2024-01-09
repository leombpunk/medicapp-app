import { ChevronDownIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { sortsObjects } from "../constants/constants"

function PatientsTable({elements, route}) {
    const navigate = useNavigate()
    const [sortedColumn, setSortedColumn] = useState("id")

    const toggleSorted = (atribute) => {
        if (sortedColumn === atribute) return setSortedColumn("id")
        setSortedColumn(atribute)
    }

    return (
        <div className="card">
            <table className="table table-fixed table-striped">
                <thead>
                    <tr>
                        <th>
                            <div className="d-flex justify-content-between align-items-center">
                                Nombre
                                <div className="circle-button order-button" onClick={() => {toggleSorted("name")}}>
                                    <div className="circle-button-icon order-button-icon"><ChevronDownIcon/></div>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div className="d-flex justify-content-between align-items-center">
                                DNI
                                <div className="circle-button order-button" onClick={() => toggleSorted("dni")}>
                                    <div className="circle-button-icon order-button-icon"><ChevronDownIcon/></div>
                                </div>
                            </div>
                            </th>
                        <th>
                            <div className="d-flex justify-content-between align-items-center">
                                Fecha de Nacimiento
                                <div className="circle-button order-button" onClick={() => toggleSorted("birthdate")}>
                                    <div className="circle-button-icon order-button-icon"><ChevronDownIcon/></div>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div className="d-flex justify-content-between align-items-center">
                                Teléfono
                                <div className="circle-button order-button" onClick={() => toggleSorted("phone")}>
                                    <div className="circle-button-icon order-button-icon"><ChevronDownIcon/></div>
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody className="table-group-divider">
                    {sortsObjects(elements, sortedColumn).map((element, index) => 
                        <tr key={index} onClick={() => navigate(`${route}/${element.id}`)} className="hover-clickable">
                            <td>{element.name}</td>
                            <td>{element.dni}</td>
                            <td>{element.birthdate}</td>
                            <td>{element.phone}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default PatientsTable