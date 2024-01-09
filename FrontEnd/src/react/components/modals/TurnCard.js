
function TurnCard() {
    return (
        <>
            <div class="card mb-3">
                <div class="card-header">
                    <h4>Turno</h4>
                </div>
                <div class="card-body">
                    <div className="row">
                        <div className="input-group mb-3">
                            <span className="input-group-text">Paciente</span>
                            <input type="text" className="form-control" placeholder="Carla Mendez" disabled required/>
                        </div>
                    </div>
                        
                    <div className="row">
                        <div className="input-group mb-3">
                            <span className="input-group-text">Tratamiento</span>
                            <select className="form-select" disabled>
                                <option value="1" defaultValue>Tratamiento 1</option>
                                <option value="2">Tratamiento 2</option>
                                <option value="3">Tratamiento 3</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group mb-3">
                            <span className="input-group-text">Fecha</span>
                            <input type="date" className="form-control" value={"2022-11-10"} disabled required/>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="input-group mb-3">
                            <span className="input-group-text">Hora</span>
                            <input type="time" className="form-control" value={"10:00"} disabled required/>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="input-group mb-3">
                            <span className="input-group-text">Duración</span>
                            <select className="form-select" disabled>
                                <option value="1">15 minutos</option>
                                <option value="2">30 minutos</option>
                                <option value="2" defaultValue>1 hora</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>   
    )
}

export default TurnCard
