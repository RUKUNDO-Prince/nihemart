const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 3,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin:{
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 3,
  },
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
