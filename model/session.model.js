// server/models/session.model.js
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  language: { type: String, default: 'en' },
  preferences: {
    budget: { type: Number },
    duration: { type: Number },
    interests: { type: [String] }
  },
  itinerary: { type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary' },
  status: { type: String, enum: ['active', 'completed'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  endedAt: { type: Date }
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;
