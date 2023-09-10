import { Router } from 'express'
import { c_data, c_registrar } from '../controllers/tpdvController';

const router = Router();
router.post('/data/list',c_data)
router.post('/:tipo',c_registrar)
/*
router.post('/search/items',items)
router.put('/:id/:tipo',c_actualizar)
*/
export default router;