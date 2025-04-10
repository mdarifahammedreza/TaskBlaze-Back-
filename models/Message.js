const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
  timestamp: { type: Date, default: Date.now },
  isGroupMessage: { type: Boolean, default: false }
});

module.exports = mongoose.model('Message', messageSchema);
