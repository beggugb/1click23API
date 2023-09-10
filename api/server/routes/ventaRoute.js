import { Router } from 'express'
import { v_listar, v_mostrar, v_registrar, v_delete, v_actualizar, v_aprobar } from '../controllers/ventaController';

const router = Router();
router.post('/data/list',v_listar)
router.get('/item/:id/:tipo',v_mostrar)
router.post('/:tipo',v_registrar)
router.post('/delete/item/list',v_delete)
router.put('/:id/:tipo',v_actualizar)
router.put('/aprobar/item/:id',v_aprobar)

export default router;