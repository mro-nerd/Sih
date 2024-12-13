// server/models/attractions.model.js
import mongoose from 'mongoose';

const attractionSchema = new mongoose.Schema({
  state: String,
  city: String,
  name: String,
  type: String,
  time_needed_to_visit_in_hrs: Number,
  google_review_rating: Number,
  entrance_fee_in_inr: Number,
  airport_with_50km_radius: String,
  weekly_off: String,
  dslr_allowed: String,
  number_of_google_review_in_lakhs: Number,
  best_time_to_visit: String
});

const Attraction = mongoose.model('Attraction', attractionSchema);

export default Attraction;
