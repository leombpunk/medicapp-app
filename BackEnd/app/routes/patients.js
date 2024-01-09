import { Router } from "express";
import { createPatient, deletePatient, getPatient, getPatientByDNI, getPatients,
    updatePatient, getPatientFiles, getPatientPhotos, deleteAllPatients,
    getPatientTurns, getPatientTreatments, getPatientNotes, createPatientNote, updatePatientNote, deletePatientNote
} from "../controlers/patients.js";
import { checkAuth } from "../middleware/auth.js";
import { validateCreate } from "../validators/patients.js";
import { validateCreateNote, validateUpdateNote } from "../validators/notes.js";

const router = Router()

router.get('/', checkAuth, getPatients)
router.get('/:id', checkAuth, getPatient)
router.get('/dni/:dni', checkAuth, getPatientByDNI)
router.post('/', checkAuth, validateCreate, createPatient)
router.patch('/:id', checkAuth, updatePatient)
router.delete('/:id', checkAuth, deletePatient)
router.delete('/all/delete', checkAuth, deleteAllPatients)

router.get('/:id/files', checkAuth, getPatientFiles)
router.get('/:id/photos', checkAuth, getPatientPhotos)
router.get('/:id/turns', checkAuth, getPatientTurns)

router.get('/:id/notes', checkAuth, getPatientNotes)
router.post('/:id/notes', checkAuth, validateCreateNote, createPatientNote)
router.patch('/:id/notes/:note', checkAuth, validateUpdateNote, updatePatientNote)
router.delete('/:id/notes/:note', checkAuth, deletePatientNote)

router.get('/:id/treatments', checkAuth, getPatientTreatments)

export { router }