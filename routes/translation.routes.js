// server/routes/translation.routes.js
import express from 'express';
import { translateContent } from '../controllers/translation.controller.js';

const router = express.Router();

router.post('/', translateContent);

export default router;
