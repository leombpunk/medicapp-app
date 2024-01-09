import { Router } from "express";
import { getTurns, getTurn, createTurn, updateTurn, deleteTurn, confirmTurn, getReports } from "../controlers/turns.js";
import { checkAuth } from "../middleware/auth.js";
import { validateCreate, validateEdit } from "../validators/turns.js";

const router = Router()
router.get('/', checkAuth, getTurns)
router.get('/reports', checkAuth, getReports)
router.get('/:id', checkAuth, getTurn)
router.post('/', checkAuth, validateCreate, createTurn)
router.patch('/:id', checkAuth, validateEdit ,updateTurn)
router.delete('/:id', checkAuth, deleteTurn)
router.post('/:id/confirm', checkAuth, confirmTurn)

export { router }