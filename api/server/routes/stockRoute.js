import { Router } from 'express'
import { s_items, s_stock, s_stocks } from '../controllers/stockController';

const router = Router();
router.post('/search/stock',s_stock)
/*router.post('/search/items',s_items)
router.post('/search/stocks',s_stocks)*/
export default router;