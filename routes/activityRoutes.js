// routes/activityRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Activity = require('../models/Activity');

router.get('/activities', auth, async (req, res) => {
  const activities = await Activity.find({ userId: req.user._id });
  res.json(activities);
});

module.exports = router;