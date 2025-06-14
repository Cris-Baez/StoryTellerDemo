const express = require('express');
const router = express.Router();

let ttsClient = null;
try {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    const textToSpeech = require('@google-cloud/text-to-speech');
    ttsClient = new textToSpeech.TextToSpeechClient();
  }
} catch (err) {
  console.warn('TTS client not initialized:', err.message);
}

router.post('/', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'No text provided' });

  const sendMock = () => {
    res.status(501).send('TTS not available');
  };

  if (!ttsClient) {
    return sendMock();
  }

  try {
    const [response] = await ttsClient.synthesizeSpeech({
      input: { text },
      voice: {
        languageCode: process.env.VOICE_LANG || 'en-US',
        ssmlGender: 'NEUTRAL'
      },
      audioConfig: { audioEncoding: 'MP3' }
    });
    res.set('Content-Type', 'audio/mpeg');
    return res.send(response.audioContent);
  } catch (err) {
    console.error('TTS error:', err.message);
    return sendMock();
  }
});

module.exports = router;
