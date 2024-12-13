// server/routes/rfid.routes.js
import express from 'express';
import { createRFIDCard, verifyRFIDCard } from '../controllers/rfid.controller.js';

const router = express.Router();

router.post('/cards', createRFIDCard);
router.post('/verify', verifyRFIDCard);

export default router;
