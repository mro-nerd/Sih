// server/controllers/rfid.controller.js
import RFID from '../model/rfid.model.js';

export const createRFIDCard = async (req, res) => {
  const { sessionId, cardId } = req.body;
  try {
    const rfidCard = new RFID({ sessionId, cardId });
    await rfidCard.save();
    res.status(201).json(rfidCard);
  } catch (err) {
    res.status(500).json({ message: 'Error creating RFID card', error: err });
  }
};

export const verifyRFIDCard = async (req, res) => {
  const { cardId } = req.body;
  try {
    const rfidCard = await RFID.findOne({ cardId, status: 'active' });
    if (rfidCard) {
      res.json({ message: 'RFID card verified successfully', userId: rfidCard.sessionId });
    } else {
      res.status(404).json({ message: 'RFID card not found or inactive' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error verifying RFID card', error: err });
  }
};
