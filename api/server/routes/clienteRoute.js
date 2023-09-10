import { Router } from 'express'
import { u_login, c_data, c_verify, c_mostrar, c_actualizar, c_registrar, c_items } from '../controllers/clienteController';
import KeyToken from '../../functions/keyToken'

const router = Router();
router.post('/login/cliente',u_login)
router.post('/data/list',c_data)
router.post('/:tipo',c_registrar)
router.put('/:id/:tipo',c_actualizar)
router.get('/item/:id/:tipo',c_mostrar)
router.post('/cliente/item/verifys',c_verify)


/*
router.post('/listas/items',c_items)*/

/*
router.post('/delete/item/list',c_borrar)
router.post('/notas/items',c_cobros)*/

export default router;
