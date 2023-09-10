import { Router } from 'express';
import { u_login, u_consolidado, u_data, u_mostrar, u_actualizar, u_registrar, u_borrar, u_items } from '../controllers/usuarioController';
import KeyToken from '../../functions/keyToken'

const router = Router();
/*router.post('/login/usuario',u_login)
router.post('/consolidados/general',KeyToken,u_consolidado)
router.post('/data/list',KeyToken,u_data)
router.get('/item/:id/:tipo',KeyToken,u_mostrar)
router.put('/:id/:tipo',KeyToken,u_actualizar)
router.post('/:tipo',KeyToken,u_registrar)
router.post('/delete/item/list',KeyToken,u_borrar)
router.post('/listas/items',KeyToken,u_items)*/


export default router;