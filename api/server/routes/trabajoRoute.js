import { Router } from 'express'
import { c_mostrar, c_registrar, c_items, c_borrar, c_actualizar, c_data  } from '../controllers/trabajoController';

const router = Router();

router.post('/data/list',c_data)
router.get('/item/:id/:tipo',c_mostrar)
router.post('/:tipo',c_registrar)
router.put('/:id/:tipo',c_actualizar)
router.post('/delete/item/list',c_borrar)
router.get('/listas/items/:id',c_items)
export default router;

