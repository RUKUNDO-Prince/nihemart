// Example using MongoDB and Mongoose
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: String, 
  message: String,
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

const Notification = mongoose.model("notification", notificationSchema);
module.exports = Notification;
