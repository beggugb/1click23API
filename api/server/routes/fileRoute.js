import { Router } from 'express'
import { e_file, c_file, p_file, a_file } from '../controllers/fileController'

const router = Router()
router.put('/empresa/item/:id',e_file)
router.put('/cliente/item/:id',c_file)
router.put('/portada/item/:id',p_file)
router.put('/producto/item/:id',a_file)
export default router;