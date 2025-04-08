// models/Activity.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: String,
  targetId: mongoose.Schema.Types.ObjectId,
  metadata: Object
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);