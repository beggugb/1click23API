import { Router } from 'express';
import { c_actualizar } from "../controllers/notaController.js";

const router = Router();
router.put('/:id/:tipo',c_actualizar)
/*router.get('/item/:id/:tipo',mostrar)*/

export default router;