import express from 'express'
import { router as patientRouter } from './patients.js'
import { router as fileRouter } from './files.js'
import { router as authRouter } from './auth.js'
import { router as turnRouter } from './turns.js'
import { router as reminderRouter } from './reminders.js'
import { router as exceptionRouter } from './exceptions.js'
import { router as chargeRouter } from './charges.js'
import { router as profesionalRouter } from './profesionals.js'
import { router as userRouter } from './users.js'
import { router as rolesRouter } from './roles.js'
import { router as scheduleRouter } from './schedule.js'
import { router as statRouter } from './stats.js'
import { handleResponse } from '../helpers/handleResponse.js'

const router = express.Router()
router.use('/patients', patientRouter)
router.use('/files', fileRouter)
router.use('/auth', authRouter)
router.use('/charges', chargeRouter)
router.use('/profesionals', profesionalRouter)
router.use('/turns', turnRouter)
router.use('/reminders', reminderRouter)
router.use('/exceptions', exceptionRouter)
router.use('/users', userRouter)
router.use('/roles', rolesRouter)
router.use('/schedule', scheduleRouter)
router.use('/stats', statRouter)

router.get('*', (request, response) => {
    const status = 404
    const message = 'Route not found'
    handleResponse(response, status, message)
})

export default router