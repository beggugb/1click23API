import { Router } from 'express'
import { c_data, c_items, c_mostrar, c_actualizar, c_registrar  } from '../controllers/productoController';

const router = Router();

router.post('/data/list',c_data)
router.get('/listas/items',c_items)
router.get('/item/:id/:tipo',c_mostrar)
router.put('/:id/:tipo',c_actualizar)
router.post('/:tipo',c_registrar)
/*
router.post('/delete/item/list',c_borrar)
*/

export default router;
