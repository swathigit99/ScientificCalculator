const express = require('express');
const router = express.Router();
const math = require('mathjs');
const History = require('../models/History');

router.post('/', async (req, res) => {
  try {
    const { expression } = req.body;
    const result = math.evaluate(expression);

    const record = new History({ expression, result });
    await record.save();

    res.json({ result });
  } catch (err) {
    res.status(400).json({ error: 'Invalid Expression' });
  }
});

router.get('/history', async (req, res) => {
  const history = await History.find().sort({ createdAt: -1 }).limit(10);
  res.json(history);
});

module.exports = router;