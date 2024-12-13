// server/models/booking.model.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  type: { type: String, enum: ['hotel', 'restaurant', 'attraction'], required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
  bookingDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'verified', 'cancelled'], default: 'pending' },
  verificationDate: { type: Date }
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
