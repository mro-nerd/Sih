// server/routes/language.routes.js
import express from 'express';
import { detectLanguage } from '../controllers/language.controller.js';

const router = express.Router();

router.post('/detect', detectLanguage);

export default router;
