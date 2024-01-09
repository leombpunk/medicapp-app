import { useForm } from 'react-hook-form'
import useModal from './useModal'
import { getSecondsOfTime } from '../../constants/functions'
import { useNotificationsContext } from '../providers/NotificationsProvider'

const checkCollapse = (worktimes, newWorktime) => {
    for (let index = 0; index < worktimes.length; index++) {
        const w = worktimes[index]
        const worktimeStartTime = getSecondsOfTime('24:00') * w.idDay + getSecondsOfTime(w.startTime)
        const worktimeEndTime   = getSecondsOfTime('24:00') * w.idDay + getSecondsOfTime(w.endTime)
        const newWorktimeStartTime = getSecondsOfTime('24:00') * newWorktime.idDay + getSecondsOfTime(newWorktime.startTime)
        const newWorktimeEndTime   = getSecondsOfTime('24:00') * newWorktime.idDay + getSecondsOfTime(newWorktime.endTime)

        const isCollapse = (
            (newWorktimeStartTime < worktimeStartTime && newWorktimeEndTime > worktimeStartTime) ||
            (newWorktimeEndTime >= worktimeEndTime && newWorktimeStartTime < worktimeEndTime) ||
            (newWorktimeStartTime >= worktimeStartTime && newWorktimeEndTime <= worktimeEndTime)
        )

        if (isCollapse) {
            return true
        }
    }

    return false
}

const useWorktimeModal = (profesional, updateWorktimes) => {
    const { addNotification } = useNotificationsContext()
    const { show, handleOpen, handleClose} = useModal()
    const worktimeForm = useForm()

    const handleConfirm = (data) => {
        if (data.id) {
            const worktimes = profesional.worktimes.filter(worktime => worktime.id !== data.id)
            const newWorktime = data

            // Check worktime
            if (getSecondsOfTime(newWorktime.startTime) >= getSecondsOfTime(newWorktime.endTime)) {
                addNotification('La hora de inicio no puede ser mayor o igual a la hora final.', 'danger')
                return
            }

            if (checkCollapse(worktimes, newWorktime)) {
                addNotification('La franja horaria se solapa con los horarios existentes.', 'danger')
                return
            }

            worktimes.push(newWorktime)
            updateWorktimes(worktimes)
            handleClose()
        } else {
            const worktimes = [...profesional.worktimes]
            const newWorktime = { ...data, id: Date.now() }

            // Check worktime
            if (getSecondsOfTime(newWorktime.startTime) >= getSecondsOfTime(newWorktime.endTime)) {
                addNotification('La hora de inicio no puede ser mayor o igual a la hora final.', 'danger')
                return
            }

            if (checkCollapse(worktimes, newWorktime)) {
                addNotification('La franja horaria se solapa con los horarios existentes.', 'danger')
                return
            }

            worktimes.push(newWorktime)
            updateWorktimes(worktimes)
            handleClose()
        }
    }

    const handleDelete = (idWorktime) => {
        const worktimes = profesional.worktimes.filter(worktime => worktime.id !== idWorktime)
        updateWorktimes(worktimes)
        handleClose()
    }

    const customHandleOpen = (data) => {
        worktimeForm.reset(data)
        handleOpen()
    }

    const customHandleClose = () => {
        worktimeForm.reset()
        handleClose()
    }

    return {
        show,
        handleOpen: customHandleOpen,
        handleClose: customHandleClose,
        worktimeForm: { ...worktimeForm, handleSubmit: worktimeForm.handleSubmit(handleConfirm), handleDelete },
    }
}

export default useWorktimeModal