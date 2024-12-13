// server/models/rfid.model.js
import mongoose from 'mongoose';

const rfidSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  cardId: { type: String, required: true, unique: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

const RFID = mongoose.model('RFID', rfidSchema);

export default RFID;
