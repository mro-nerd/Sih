// server/routes/itinerary.routes.js
import express from 'express';
import { createItinerary, updateItinerary, getItinerary, addItemToItinerary, removeItemFromItinerary } from '../controllers/itinerary.controller.js';

const router = express.Router();

router.post('/', createItinerary);
router.put('/', updateItinerary);
router.get('/:itineraryId', getItinerary);
router.post('/add', addItemToItinerary);
router.post('/remove', removeItemFromItinerary);

export default router;
