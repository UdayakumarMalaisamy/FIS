import express, { Router } from 'express';
const router = express.Router();

import { createStock, getAllStocks ,updateStock,deleteStock} from '../controllers/StockController.js';

router.post('/createStock', createStock);
router.get('/getAll', getAllStocks); 
router.put('/updateStock/:id', updateStock);
router.delete('/deleteStock/:id', deleteStock);


export default router;
    