import { Router } from 'express'
import { e_item, e_update }  from '../controllers/empresaController.js';

const router = Router();
router.get('/item/:id/:tipo',e_item)
router.put('/:id/:tipo',e_update)
export default router;