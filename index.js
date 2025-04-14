// index.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/mongoose');
const setupSocket = require('./config/socket');  // Import socket setup

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const activityRoutes = require('./routes/activityRoutes');
const taskRoutes = require('./routes/taskRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const statusRoute = require('./utils/serverStatus');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);  // Create an HTTP server using Express
setupSocket(server);  // Setup Socket.IO with the server

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', chatRoutes);
app.use('/api', activityRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api', conversationRoutes);

app.get('/', statusRoute);

server.listen(process.env.PORT || 5000, () => {
  console.log('Server running on port', process.env.PORT || 5000);
});
