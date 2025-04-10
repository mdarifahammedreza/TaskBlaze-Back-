// config/socket.js
const socketio = require('socket.io');

const setupSocket = (server) => {
  // Initialize Socket.IO
  const io = socketio(server, {
    cors: {
      origin: '*',  // Allow connections from any origin (modify as needed)
    },
  });

  // Handle user connection
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle user disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });

    // Handle user joining a specific room (group or conversation)
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room: ${roomId}`);
    });

    // Handle user leaving a room
    socket.on('leaveRoom', (roomId) => {
      socket.leave(roomId);
      console.log(`User ${socket.id} left room: ${roomId}`);
    });

    // Handle real-time message sending/receiving
    socket.on('sendMessage', (messageData) => {
      const { roomId, message,user } = messageData;
      messageData= { message, user }; // Include user information
      // Broadcast the message to all users in the room
      io.to(roomId).emit('receiveMessage', messageData);
      console.log(`Message sent to room ${roomId}: ${message}`);
    });

    // Handle room creation (group or conversation)
    socket.on('createRoom', (roomId, userId) => {
      // Automatically join the creator to the room
      socket.join(roomId);
      console.log(`User ${userId} created and joined room: ${roomId}`);

      // You can store room data in a database, if necessary
      // Example: save the room to the database or some in-memory structure

      // Emit an event to notify all participants that the room was created
      io.to(roomId).emit('roomCreated', {
        message: `Room ${roomId} has been created.`,
        roomId: roomId,
        creator: userId,  // Optionally send the creator's ID to identify them
      });
    });
  });
};

module.exports = setupSocket;
