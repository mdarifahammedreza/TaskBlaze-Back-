// middlewares/auth.js
const admin = require('../config/firebase');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'No token provided' });

    const decoded = await admin.auth().verifyIdToken(token);
    let user = await User.findOne({ firebaseUid: decoded.uid });

    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        username: decoded.name || decoded.email.split('@')[0],
        email: decoded.email,
        avatar: decoded.picture || null
      });
      console.log(`New user created: ${decoded.email,user}`);
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Unauthorized', error: err.message });
  }
};

module.exports = authMiddleware;