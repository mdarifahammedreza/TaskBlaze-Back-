// config/firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('../Private/taskblaze-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;