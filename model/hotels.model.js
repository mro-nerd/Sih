// server/models/hotels.model.js
import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  address: String,
  area: String,
  city: String,
  guest_recommendation: Number,
  hotel_facilities: [String],
  hotel_star_rating: Number,
  latitude: Number,
  longitude: Number,
  property_name: String,
  property_type: String,
  site_review_count: Number,
  site_review_rating: Number,
  site_stay_review_rating: [String],
  state: String,
  average_price: Number
});

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;
