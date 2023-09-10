import { Router } from 'express'
import { s_mostrar, s_registrar, s_items, s_borrar, s_actualizar, s_data  } from '../controllers/sucursalController';

const router = Router();

router.post('/data/list',s_data)
router.post('/:tipo',s_registrar)
router.put('/:id/:tipo',s_actualizar)
router.post('/delete/item/list',s_borrar)
router.get('/item/:id/:tipo',s_mostrar)
/*router.get('/listas/items',s_items)*/
export default router;
