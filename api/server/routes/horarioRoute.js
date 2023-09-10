import { Router } from 'express'
import { s_actualizar, s_data  } from '../controllers/horarioController';

const router = Router();

router.post('/data/list',s_data)
router.put('/:id/:tipo',s_actualizar)

/*
router.post('/:tipo',s_registrar)
router.post('/delete/item/list',s_borrar)
router.get('/item/:id/:tipo',s_mostrar)
router.get('/listas/items',s_items)*/
export default router;
