import Modal from "react-bootstrap/Modal";
import { XMarkIcon } from "@heroicons/react/24/solid"
import { Input } from "../basis"

function WorktimeModal({ worktime, handleWorktime, show, handleClose, handleOpen }) {

    const handleSubmit = async (event) => {

    }

    const handleForm = ({target}) => {
        
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Body>
                    <div className="mb-3 d-flex align-items-center justify-content-between">
                        <h4>Añadir Franja Horaria</h4>
                        <button className="circle-button circle-border-button" onClick={handleClose}>
                            <div className="circle-button-icon"><XMarkIcon/></div>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="d-flex flex-column gap-3 mb-4">

                            <div className="row">
                                <Input
                                    label="Inicio"
                                    type="time"
                                    name="startTime"
                                    value={null}
                                    handleChange={handleForm}
                                    isRequired={true}
                                />
                            </div>

                        </div>

                        <div className="d-flex justify-content-end">
                            <button className="btn btn-success">Guardar</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>   
    )
}

export default WorktimeModal
