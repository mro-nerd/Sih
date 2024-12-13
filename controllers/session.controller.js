import Session from '../model/session.model.js';
import { v4 as uuidv4 } from 'uuid';

export const createSession = async (req, res) => {
  const { language } = req.body;
  const sessionId = uuidv4();
  const session = new Session({ sessionId, language });
  try {
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ message: 'Error creating session', error: err });
  }
};

export const updateSessionPreferences = async (req, res) => {
  const { sessionId, preferences } = req.body;
  try {
    const session = await Session.findOneAndUpdate({ sessionId }, { preferences }, { new: true });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: 'Error updating session preferences', error: err });
  }
};

export const getSession = async (req, res) => {
  const { sessionId } = req.params;
  try {
    const session = await Session.findOne({ sessionId }).populate('itinerary');
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving session', error: err });
  }
};

export const endSession = async (req, res) => {
  const { sessionId } = req.body;
  try {
    const session = await Session.findOneAndUpdate({ sessionId }, { status: 'completed', endedAt: new Date() }, { new: true });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: 'Error ending session', error: err });
  }
};
