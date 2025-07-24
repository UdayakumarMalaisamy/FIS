import express , { Router } from 'express';
const router = express.Router();

import { createBill, getAllBills , updateBill, deleteBill} from '../controllers/stockBillController.js';

router.post('/createBill', createBill);
router.get('/getAllBills', getAllBills);
router.put('/updateBill/:id', updateBill);
router.delete('/deleteBill/:id', deleteBill);


export default router;