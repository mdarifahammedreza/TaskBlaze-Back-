// sockets/index.js
const { Server } = require('socket.io');
const User = require('../models/User');
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const Activity = require('../models/Activity');

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('authenticate', async (userId) => {
      await User.findByIdAndUpdate(userId, { online: true });
      socket.broadcast.emit('userOnline', userId);
    });

    socket.on('joinChats', (chatIds) => {
      chatIds.forEach(chatId => socket.join(chatId));
    });

    socket.on('sendMessage', async (data) => {
      try {
        const message = new Message({
          chatId: data.chatId,
          sender: data.senderId,
          content: data.content,
          attachments: data.attachments || []
        });

        await message.save();
        await Chat.findByIdAndUpdate(data.chatId, { lastMessage: message._id });

        const populatedMsg = await message.populate('sender', 'username avatar');
        const chat = await Chat.findById(data.chatId);

        await Promise.all(chat.participants.map(userId =>
          Activity.create({
            userId,
            action: 'message_sent',
            targetId: data.chatId,
            metadata: { messageId: message._id }
          })
        ));

        io.to(data.chatId).emit('newMessage', populatedMsg);
      } catch (err) {
        console.error('Message send error:', err);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = setupSocket;