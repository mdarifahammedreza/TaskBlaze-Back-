// index.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/mongoose');
const setupSocket = require('./sockets');

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const activityRoutes = require('./routes/activityRoutes');
const statusRoute = require('./utils/serverStatus');
const taskRoutes = require('./routes/taskRoutes');


dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
setupSocket(server);

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', chatRoutes);
app.use('/api', activityRoutes);
app.get('/', statusRoute);
app.use('/api/tasks', taskRoutes);
server.listen(process.env.PORT || 5000, () => {
  console.log('Server running on port', process.env.PORT || 5000);
});



