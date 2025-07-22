import express, { Router } from 'express';
const router = express.Router();

import { createStock, getAllStocks ,} from '../controllers/StockController.js';

router.post('/createStock', createStock);
router.get('/getAll', getAllStocks); 
import { deleteStock, updateStock } from '../controllers/StockController.js';
router.delete('/deleteStock/:id', deleteStock);
router.put('/updateStock/:id', updateStock);


export default router;
    