const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const sounds = require('../data/ambient-sounds.json');

router.get('/', (req, res) => {
  const setting = (req.query.setting || '').toLowerCase();
  const file = sounds[setting] || sounds['default'];
  const filePath = path.join(__dirname, '../data/ambient', file);
  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }
  res.status(501).send('Ambient sound not available');
});

module.exports = router;
