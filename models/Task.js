const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  category: { type: String, default: 'xyz' },
  group: { type: String },
  content: { type: String, required: true },
  description: { type: String },
  rating: { type: Number, default: 0 },
  deadline: { type: Date },
  status: {
    Doing: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    Done: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
