// server/models/restaurants.model.js
import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  rating: Number,
  number_of_ratings: Number,
  average_price: Number,
  area: String,
  pure_veg: String,
  location: String
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
