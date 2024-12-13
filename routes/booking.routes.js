// server/routes/booking.routes.js
import express from 'express';
import { createBooking, updateBookingStatus, getBookings, verifyBooking, bookEntireItinerary } from '../controllers/booking.controller.js';

const router = express.Router();

router.post('/', createBooking);
router.put('/status', updateBookingStatus);
router.get('/:sessionId', getBookings);
router.post('/verify', verifyBooking);
router.post('/book-itinerary', bookEntireItinerary);

export default router;
