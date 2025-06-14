
const express = require('express');
const cors = require('cors');
const parseRoute = require('./routes/parse');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/parse', parseRoute);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
