//routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

// Create a task
router.post('/', auth, createTask);

// Get all tasks for the user
router.get('/', auth, getTasks);

// Get a specific task
router.get('/:id', auth, getTaskById);

// Update a task
router.put('/:id', auth, updateTask);

// Delete a task
router.delete('/:id', auth, deleteTask);

module.exports = router;
