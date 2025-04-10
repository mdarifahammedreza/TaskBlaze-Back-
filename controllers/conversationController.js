//controllers/conversationController.js
// const Conversation = require('../models/Conversation');

// Create a new conversation (1-to-1 or group)
exports.createConversation = async (req, res) => {
  try {
    const { isGroup, members, groupName } = req.body;

    // Validation for group conversation
    if (isGroup && (!groupName || members.length < 2)) {
      return res.status(400).json({ message: 'Group must have a name and at least 2 members' });
    }

    // Create conversation
    const conversation = new Conversation({
      isGroup,
      members,
      groupName: isGroup ? groupName : null,
      groupAdmin: isGroup ? req.user._id : null
    });

    await conversation.save();
    res.status(201).json(conversation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all conversations for a user (1-to-1 and group conversations)
exports.getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ members: req.user._id })
      .populate('members', 'username email') // Populate member details
      .populate('groupAdmin', 'username') // Populate group admin details (for group convos)
      .sort({ createdAt: -1 }); // Sort by most recent
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
