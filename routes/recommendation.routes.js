// server/routes/recommendation.routes.js
import express from 'express';
import { recommendHotels, recommendRestaurants, recommendAttractions } from '../controllers/recommendation.controller.js';

const router = express.Router();

router.get('/hotels', recommendHotels);
router.get('/restaurants', recommendRestaurants);
router.get('/attractions', recommendAttractions);

export default router;
