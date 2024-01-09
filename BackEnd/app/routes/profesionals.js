import { Router } from "express";
import {
    getProfesionals,
    getProfesional,
    getProfesionalEvents,
    saveProfesionalScheduleConfig, 
    getProfesionalTreatments,
    getProfesionalTreatment,
    createProfesionalTreatment,
    updateProfesionalTreatment,
    deleteProfesionalTreatment,
} from "../controlers/profesionals.js";
import { checkAuth, checkUser } from "../middleware/auth.js";
import { deleteAllPatients } from "../controlers/patients.js";
import { validateCreateTreatment, validateUpdateTreatment } from "../validators/treatment.js";

const router = Router()

router.get('/', checkAuth, getProfesionals)
//router.get('/all', checkAuth, getAllProfesionals) //trae todos los profesionales sin paginar
router.get('/:id', checkAuth, getProfesional)
router.get('/:id/events', checkAuth, getProfesionalEvents)
//router.delete('/all/events/delete', checkAdmin, deleteAllPatients)
router.post('/:id/config', checkUser, saveProfesionalScheduleConfig)

router.get('/:id/treatments', checkAuth, getProfesionalTreatments)
router.get('/:id/treatments/:treatment', checkAuth, getProfesionalTreatment)
router.post('/:id/treatments', checkUser, validateCreateTreatment, createProfesionalTreatment)
router.patch('/:id/treatments/:treatment', checkUser, validateUpdateTreatment,updateProfesionalTreatment)
router.delete('/:id/treatments/:treatment', checkUser, deleteProfesionalTreatment)

export { router };