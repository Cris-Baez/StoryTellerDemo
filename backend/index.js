
const express = require('express');
const cors = require('cors');
const parseRoute = require('./routes/parse');
const ttsRoute = require('./routes/tts');
const saveRoute = require('./routes/save');
const ambientRoute = require('./routes/ambient');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/parse', parseRoute);
app.use('/tts', ttsRoute);
app.use('/save', saveRoute);
app.use('/ambient', ambientRoute);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
