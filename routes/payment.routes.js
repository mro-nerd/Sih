// server/routes/payment.routes.js
import express from 'express';
import { createPaymentIntent, confirmPayment } from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/intent', createPaymentIntent);
router.post('/confirm', confirmPayment);

export default router;
