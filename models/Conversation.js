const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  isGroup: { type: Boolean, default: false },

  // Members: for both group and 1-on-1
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  // Group-specific fields
  groupName: { type: String },
  groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  groupAvatar: { type: String, default: null }, // optional

  createdAt: { type: Date, default: Date.now }
});
