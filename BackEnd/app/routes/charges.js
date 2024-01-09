import { Router } from "express";
import { getCharges, createCharge, updateCharge, deleteCharge, getChargesSearcher } from "../controlers/charges.js";
import { checkAuth } from "../middleware/auth.js";
import { validateCreate } from "../validators/charge.js";

const router = Router()

router.get('/', getCharges)
router.get('/search', getChargesSearcher)
router.post('/', checkAuth, validateCreate, createCharge)
router.patch('/:id', checkAuth, updateCharge)
router.delete('/:id', checkAuth, deleteCharge)

export { router };