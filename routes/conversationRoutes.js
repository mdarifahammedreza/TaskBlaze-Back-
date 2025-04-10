const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { createConversation, getConversations } = require('../controllers/conversationController');

// Create a new conversation (1-to-1 or group)
router.post('/', auth, createConversation);

// Get all conversations for a user
router.get('/', auth, getConversations);

module.exports = router;
