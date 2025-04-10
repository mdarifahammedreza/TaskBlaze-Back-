const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { sendMessage, getMessages } = require('../controllers/messageController');

// Send a message
router.post('/', auth, sendMessage);

// Get messages for a conversation
router.get('/:conversationId', auth, getMessages);

module.exports = router;
