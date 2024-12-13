import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  language: { type: String, default: 'en' },
  preferences: {
    budget: { type: Number },
    duration: { type: Number },
    interests: { type: [String] }
  },
  itinerary: { type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary' }
});

const User = mongoose.model('User', userSchema);

export default User;
