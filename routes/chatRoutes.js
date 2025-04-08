// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Chat = require('../models/Chat');
const Message = require('../models/Message');

router.get('/chats', auth, async (req, res) => {
  const chats = await Chat.find({ participants: req.user._id })
    .populate('participants', 'username avatar')
    .populate('lastMessage');
  res.json(chats);
});

module.exports = router;