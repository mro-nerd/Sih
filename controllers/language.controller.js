// server/controllers/language.controller.js
import languageMapping from '../utils/languageMapping.js';

export const detectLanguage = async (req, res) => {
  const { transcript } = req.body;
  try {
    const languageCode = languageMapping[transcript.toLowerCase()] || 'en';
    res.json({ languageCode });
  } catch (err) {
    res.status(500).json({ message: 'Error detecting language', error: err });
  }
};
