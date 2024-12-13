import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import sessionRoutes from './routes/session.routes.js';
import itineraryRoutes from './routes/itinerary.routes.js';
import bookingRoute from './routes/booking.routes.js';
//import paymentRoutes from './routes/payment.routes.js';
import rfidRoutes from './routes/rfid.routes.js';
import languageRoutes from './routes/language.routes.js';
//import translationRoutes from './routes/translation.routes.js';
import recommendationRoutes from './routes/recommendation.routes.js';
import Hotel from './model/hotels.model.js';
import Restaurant from './model/restaurants.model.js';
import Attraction from './model/attractions.model.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then(async () => {
  console.log('Connected to DB');
}).catch((err) => {
  console.log(err);
});

const app = express();
app.use(express.json());
app.use(cookieParser());

// API endpoints for hotels, restaurants, and attractions
app.get('/api/hotels', async (req, res) => {
  const hotels = await Hotel.find();
  res.json(hotels);
});

app.get('/api/restaurants', async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
});

app.get('/api/attractions', async (req, res) => {
  const attractions = await Attraction.find();
  res.json(attractions);
});

// API endpoints for session operations
app.use('/api/sessions', sessionRoutes);

// API endpoints for itinerary operations
app.use('/api/itineraries', itineraryRoutes);

 // API endpoints for booking operations
app.use('/api/bookings', bookingRoute);

// API endpoints for payment operations
// app.use('/api/payments', paymentRoutes);

 // API endpoints for RFID operations
app.use('/api/rfid', rfidRoutes);

// API endpoint for language detection
app.use('/api/language', languageRoutes);

// API endpoint for content translation
// app.use('/api/translate', translationRoutes);

// API endpoints for recommendations
 app.use('/api/recommendations', recommendationRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000!!');
});

app.post('/rfid', (req, res) => {
  const { card_id } = req.body;
  console.log('Received card ID:', card_id);

  // Process the card ID (e.g., save it to a database)
  res.send({ message: 'Card ID received', card_id });
});
