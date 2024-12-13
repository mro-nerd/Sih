// server/routes/session.routes.js
import express from 'express';
import { createSession, updateSessionPreferences, getSession, endSession } from '../controllers/session.controller.js';

const router = express.Router();

router.post('/', createSession);
router.put('/preferences', updateSessionPreferences);
router.get('/:sessionId', getSession);
router.post('/end', endSession);

export default router;
