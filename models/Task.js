const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    category: { type: String, default: "general" },
    group: { type: String },
    content: { type: String, required: true },
    description: { type: String },
    rating: { type: Number, default: 0 },
    deadline: { type: Date },
    status: {
      pending: {
        isActive: { type: Boolean, default: true },  // indicates whether the task is pending
        count: { type: Number, default: 50 },  // count of pending tasks (if needed)
      },
      doing: {
        isActive: { type: Boolean, default: false },  // indicates whether the task is being worked on
        count: { type: Number, default: 0 },  // count of tasks in progress (if needed)
      },
      done: {
        isActive: { type: Boolean, default: false },  // indicates whether the task is completed
        count: { type: Number, default: 0 },  // count of tasks completed (if needed)
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
