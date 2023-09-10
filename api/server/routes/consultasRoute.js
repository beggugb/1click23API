import { Router } from 'express'
import { c_data, c_mostrar  } from '../controllers/consultasController';

const router = Router();

router.post('/data/list',c_data)
router.post('/item/:id/:tipo',c_mostrar)

export default router;

