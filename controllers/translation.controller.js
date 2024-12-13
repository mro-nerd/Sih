// server/controllers/translation.controller.js
import { Translate } from '@google-cloud/translate';

const translateClient = new Translate({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  key: process.env.GOOGLE_CLOUD_API_KEY,
});

export const translateContent = async (req, res) => {
  const { text, targetLanguage } = req.body;
  try {
    const [translation] = await translateClient.translate(text, targetLanguage);
    res.json({ translatedText: translation });
  } catch (err) {
    res.status(500).json({ message: 'Error translating content', error: err });
  }
};
