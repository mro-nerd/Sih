import Booking from '../model/booking.model.js';
import RFID from '../model/rfid.model.js';
import { v4 as uuidv4 } from 'uuid';
import { endSession } from './session.controller.js';
import Itinerary from '../model/itinerary.model.js';

export const createBooking = async (req, res) => {
  const { sessionId, type, itemId, bookingDate } = req.body;
  try {
    // Check if the booking already exists
    const existingBooking = await Booking.findOne({ sessionId, type, itemId });
    if (existingBooking) {
      return res.status(400).json({ message: 'Item already booked' });
    }

    const booking = new Booking({ sessionId, type, itemId: uuidv4(), bookingDate });
    await booking.save();

    // Check if an RFID card already exists for the session
    const existingRfidCard = await RFID.findOne({ sessionId });
    if (!existingRfidCard) {
      // Issue RFID card
      const rfidCard = new RFID({ sessionId, cardId: uuidv4() });
      await rfidCard.save();
    }

    // End the session
    await endSession({ body: { sessionId } }, res);

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Error creating booking', error: err });
  }
};
export const updateBookingStatus = async (req, res) => {
  const { bookingId, status } = req.body;
  try {
    const booking = await Booking.findOneAndUpdate({ _id: bookingId }, { status }, { new: true });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Error updating booking status', error: err });
  }
};

export const getBookings = async (req, res) => {
  const { sessionId } = req.params;
  try {
    const bookings = await Booking.find({ sessionId }).populate('itemId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving bookings', error: err });
  }
};

export const verifyBooking = async (req, res) => {
  const { cardId, type } = req.body;
  try {
    const rfidCard = await RFID.findOne({ cardId });
    if (!rfidCard) {
      return res.status(404).json({ message: 'RFID card not found' });
    }

    const booking = await Booking.findOne({ sessionId: rfidCard.sessionId, type, status: 'confirmed' });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found or already verified' });
    }

    booking.status = 'verified';
    booking.verificationDate = new Date();
    await booking.save();

    res.json({ message: 'Booking verified successfully', booking });
  } catch (err) {
    res.status(500).json({ message: 'Error verifying booking', error: err });
  }
};

export const bookEntireItinerary = async (req, res) => {
  const { itineraryId } = req.body;
  try {
    const itinerary = await Itinerary.findById(itineraryId).populate('days.hotels days.restaurants days.attractions');
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    const bookings = [];
    for (const day of itinerary.days) {
      for (const hotel of day.hotels) {
        const booking = new Booking({
          sessionId: itinerary.sessionId,
          type: 'hotel',
          itemId: hotel._id,
          bookingDate: day.date
        });
        await booking.save();
        bookings.push(booking);
      }
      for (const restaurant of day.restaurants) {
        const booking = new Booking({
          sessionId: itinerary.sessionId,
          type: 'restaurant',
          itemId: restaurant._id,
          bookingDate: day.date
        });
        await booking.save();
        bookings.push(booking);
      }
      for (const attraction of day.attractions) {
        const booking = new Booking({
          sessionId: itinerary.sessionId,
          type: 'attraction',
          itemId: attraction._id,
          bookingDate: day.date
        });
        await booking.save();
        bookings.push(booking);
      }
    }

    // Issue RFID card
    const rfidCard = new RFID({ sessionId: itinerary.sessionId, cardId: uuidv4() });
    await rfidCard.save();

    // End the session
    await endSession({ body: { sessionId: itinerary.sessionId } }, res);

    res.status(201).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error booking entire itinerary', error: err });
  }
};
