const mongoose = require("mongoose");

const adminPanelSchema = new mongoose.Schema({
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
});

const AdminPanel = mongoose.model("AdminPanel", adminPanelSchema);

module.exports = AdminPanel;
