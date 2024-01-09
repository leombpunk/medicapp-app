import { Router } from 'express'
import { getAllConfig, getConfig, setConfig, deleteConfig } from '../controlers/schedule.js'
import { validateConfig } from '../validators/schedule.js'
import { uniqueIdValidator } from '../middleware/uniqueId.js'
import { timeValidator } from '../middleware/timeCoherence.js'
import { checkAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', checkAuth, getAllConfig)
router.get('/config/:idProfesional', checkAuth, getConfig)
router.post('/config/:idProfesional', checkAuth, validateConfig, uniqueIdValidator, timeValidator, setConfig)
router.delete('/config/:idProfesional', checkAuth, deleteConfig)

export { router }