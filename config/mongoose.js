// config/mongoose.js
const mongoose = require('mongoose');
require('dotenv').config();

const uri = `mongodb+srv://reza1:${process.env.PASS}@reza.lrvbq.mongodb.net/?retryWrites=true&w=majority&appName=REZA`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

module.exports = connectDB;