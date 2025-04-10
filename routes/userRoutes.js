// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const User = require('../models/User');

// GET all users except the current user
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find()
      .select('username avatar online lastSeen');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST to get all users (same functionality)
router.post('/users', auth, async (req, res) => {
  try {
    const users = await User.find()
      .select('username avatar online lastSeen');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
