import express, { Router } from 'express';
const router = express.Router();

import { createStock, getAllStocks ,updateStock,deleteStock, ExpiredStock} from '../controllers/StockController.js';
import { billcount } from '../controllers/stockBillController.js';

router.post('/createStock', createStock);
router.get('/getAll', getAllStocks); 
router.put('/updateStock/:id', updateStock);
router.delete('/deleteStock/:id', deleteStock);
router.get('/expried', ExpiredStock);
    

export default router;
    