const express = require('express');
const router = express.Router();
const scenes = require('../data/story-mock.json');

// For the MVP, simply return mock scenes regardless of input
router.post('/', (req, res) => {
  res.json(scenes);
});

module.exports = router;
