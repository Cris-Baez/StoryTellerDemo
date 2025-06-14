const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/', (req, res) => {
  const { title = 'Untitled', scenes = [], user = 'guest' } = req.body;
  const date = new Date().toISOString();
  const entry = { title, date, scenes };

  const userDir = path.join(__dirname, '../data/users', user);
  if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });
  const filePath = path.join(userDir, `${Date.now()}.json`);

  try {
    fs.writeFileSync(filePath, JSON.stringify(entry, null, 2));
    res.json({ success: true });
  } catch (err) {
    console.error('Save error:', err.message);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
