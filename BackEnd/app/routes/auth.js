import { Router } from "express";
import { loginCtrl, registerCtrl, resetPassword, updateCtrl/*, checkLogin*/ } from "../controlers/auth.js"
import { validateCreate } from "../validators/auth.js"
import { checkAuth } from "../middleware/auth.js"

const router = Router()

router.post('/login', loginCtrl)
router.post('/register', validateCreate, registerCtrl)
router.patch('/update', checkAuth, updateCtrl)
router.post('/resetpassword', resetPassword)
//ruta para verificar que el token no expiró
// router.get('/checkUser', checkAuth, checkLogin)

export { router }