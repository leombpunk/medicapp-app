import { useState } from 'react'
import { CheckIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useNotificationsContext } from '../providers/NotificationsProvider'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'

//lista de dias
const SelectDaysOfWeek = ({ days, toggleDays, editMode }) => {
    return (
        <div>
            <h5>Días de la semana</h5>
            <hr></hr>

            <div className="d-flex justify-content-center gap-2">
                {days.map(day => 
                    <div key={day.id}>
                        <button type='button' disabled={!editMode} className={`btn button-96 ${day.enabled ? "btn-dark" : "btn-outline-dark"}`} onClick={event => toggleDays(day.id)}>{day.day.description.toUpperCase()}</button>
                    </div>
                )}
            </div>
        </div>
    )
} 

//lista de franjas horarias
const SelectWorkTimes = ({ days, editMode, handleWorkTimes, handleChangeTimes }) => {
    const handleAddEditWorkTimes = (idDay) => {
        handleWorkTimes(idDay)
    }
    const handleDeleteWorkTimes = (idDay, index) => {
        handleWorkTimes(idDay, index);
    }

    return (
        <div>
            <h5>Franjas Horarias</h5>
            <hr></hr>

            <div className="d-flex justify-content-center gap-2">
                
                {days.map((day, index) => 
                    day.enabled ?
                    <div className="d-flex flex-column gap-2" key={`asd${index}`}>
                        {day.worktimes.map((worktime, index) => <WorkTimes key={index} workTime={worktime} editMode={editMode} onDelete={() => handleDeleteWorkTimes(day.id, index)} handleChangeTimes={handleChangeTimes}/>)}
                        <button type='button' className="btn button-96 btn-outline-primary" disabled={!editMode} onClick={event => handleAddEditWorkTimes(day.id)}> + </button> 
                    </div>
                    :
                    <button type='button' className="btn button-96 btn-transparent text-white" key={`asd${index}`} disabled></button>
                )}

            </div>
        </div>
    )
}

//franja horaria
const WorkTimes = ({ workTime, editMode, onDelete, handleChangeTimes }) => {
    const handleDelete = () => {
        onDelete()
    }
    const handleChangeStartTime = (event) => {
        handleChangeTimes({id: workTime.id, idWorkday: workTime.idWorkday, startTime: event.target.value, endTime: workTime.endTime})
    }
    const handleChangeEndTime = (event) => {
        handleChangeTimes({id: workTime.id, idWorkday: workTime.idWorkday, startTime: workTime.startTime, endTime: event.target.value})
    }

    return (
        <div className="card border-dark button-96 p-2">
            <div className="d-flex justify-content-end mb-3">
                <button type='button' className="btn button-48 btn-outline-danger" disabled={!editMode} onClick={event => handleDelete()}>
                    <XMarkIcon />
                </button>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <div className="form-floating mb-3">
                                <input type="time" className="form-control" onChange={event => handleChangeStartTime(event)} value={workTime.startTime} disabled={!editMode}/>
                                <label>Inicio</label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="form-floating mb-3">
                                <input type="time" className="form-control" onChange={event => handleChangeEndTime(event)} value={workTime.endTime} disabled={!editMode}/>
                                <label>Fin</label>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

const ScheduleSettingData = ({ setting, handleEditSetting }) => {
    const [ editMode, setEditMode ] = useState(false)
    const [ editData, setEditData ] = useState(setting.workdays)
    console.log(setting)
    const { addNotification } = useNotificationsContext()
    const toggleEnableDay = (data) => {
        setEditData(editData.map((day) => 
            day.id === data && day.enabled === 0 ? { ...day, enabled: 1 } : day.id === data && day.enabled === 1 ? { ...day, enabled: 0 } : day
        ))
    }
    const handleChangeTimes = (worktime) => {
        setEditData(editData.map((day) => {
            if(day.id === worktime.idWorkday){
                day.worktimes.find((element) => {
                    if(element.id === worktime.id){
                        element.startTime = worktime.startTime
                        element.endTime = worktime.endTime
                    }
                    return element
                })
            } 
            return day 
        }))
    }
    const addEditWorkTimes = (idDay, index = -1) => {
        if (index === -1) {
            // console.log('estoy AGREGANDO un object al array de worktimes')
            setEditData(editData.map((day) => {
                if (day.id === idDay){
                    day.worktimes.push({id:0, idWorkday:day.id, startTime:'00:00:00', endTime:'00:00:00'}) 
                }
                return day
            }))
        } else {
            // console.log('estoy ELIMINANDO un abject del array worktimes segun el indice')
            setEditData(editData.map((day) => {
                if (day.id === idDay){
                    day.worktimes.splice(index, 1)
                }
                return day
            }))
        }
    }
    const toggleEditMode = () => {
        setEditMode(!editMode)
    }
    const handleEdit = async (data) => {
        // console.log('editando')
        const newWordays = editData.map((day) => {
            if (day.worktimes.length === 0){
                day.worktimes.push({ id:0, idWorkday:day.id, startTime:'00:00', endTime:'00:00' })
            }
            return day
        })
        const newSetting = {
            idPro: setting.id,
            idRole: setting.idRole,
            idCharge: setting.idCharge,
            workdays: newWordays
        }
        // console.log(newWordays)
        const result = await handleEditSetting(newSetting)
        if (result.status === 200) {
            addNotification('Configuracion aplicada exitosamente.', 'success')
        }
        else {
            console.log(`Algo malio sal: ${result}`)
            addNotification('A ocurrido un error.', 'warning')
        }
    }

    const handleCancel = () => {
        // console.log('cancelando')
        setEditData(setting.workdays)
        addNotification('Operación cancelada exitosamente.', 'warning')
    }

    return (
        <div className='d-flex flex-column gap-4'>
            
            <div className='panel'>
                <div className='d-flex align-items-center justify-content-between'>

                    <div className='d-flex align-items-center gap-1'>
                        <div className='title-icon'>
                            <Cog6ToothIcon/>                  
                        </div>

                        <div className='title'>
                            Configuración
                        </div>
                    </div>

                    <div className='d-flex gap-2'>
                        <button
                            type='button'
                            className={`btn btn-outline-success d-flex gap-1 align-items-center ${editMode ? '' : 'd-none'}`}
                            onClick={handleEdit}
                            title='Guardar'
                        >
                            <CheckIcon style={{ width: '1.5rem', height: '2rem' }}/>
                            Guardar
                        </button>

                        <button
                            type='button'
                            className={`btn d-flex gap-1 align-items-center ${editMode ? 'btn-outline-danger' : 'btn-outline-success'}`}
                            onClick={() => { 
                                toggleEditMode()
                                editMode && handleCancel()
                            }}
                            title={editMode ? 'Cancelar edición' : 'Toque para editar'}
                        >
                            {editMode
                                ? <><XMarkIcon style={{ width: '1.5rem', height: '2rem' }}/> Cancelar</>
                                : <><PencilIcon style={{ width: '1.5rem', height: '2rem' }}/> Editar</>
                            }
                        </button>
                    </div>
                </div>
            </div>
            <form>
                <div className='d-flex flex-column gap-3'>
                    <SelectDaysOfWeek days={editData} toggleDays={toggleEnableDay} key={'equisde1'} editMode={editMode} />
                </div>
                <div className='d-flex flex-column gap-3 mt-3'>
                    <SelectWorkTimes days={editData} key={'equisde2'} editMode={editMode} handleWorkTimes={addEditWorkTimes} handleChangeTimes={handleChangeTimes} />
                </div>
            </form>         
        </div>
    )
}

export default ScheduleSettingData