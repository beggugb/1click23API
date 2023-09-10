import { Router } from 'express';
import { i_existencias, i_ventas, i_maxventas,i_maxcompras,  i_compras, i_productos, i_movimientos, i_pagos, i_cobros, i_cajas, i_estados } from '../controllers/informesController';

const router = Router();
/* Inventarios**/
router.post('/existencias', i_existencias)
router.post('/productos',i_productos)
router.post('/movimientos',i_movimientos)
/* Vencimientos**/
router.post('/vencimientosc',i_cobros)
router.post('/vencimientosp',i_pagos)
/* Cajas**/
router.post('/cajas',i_cajas)
/* Clientes**/
router.post('/estados',i_estados)
/* Compras**/
router.post('/compras',i_compras)
router.post('/maxcompras',i_maxcompras)
/** Ventas */
router.post('/ventas',i_ventas)
router.post('/maxventas',i_maxventas)



export default router;
