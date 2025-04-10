//controllers/messageController.js
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { content, conversationId } = req.body;

    // Validate if conversation exists
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    // Create new message
    const message = new Message({
      sender: req.user._id,
      content,
      conversation: conversationId,
      isGroupMessage: conversation.isGroup,
    });
    await message.save();
console.log(message)
    // Return the message
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get messages for a specific conversation
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversation: req.params.conversationId })
      .populate('sender', 'username email avatar')
      .sort({ timestamp: 1 }); // Sort messages by timestamp in ascending order
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
