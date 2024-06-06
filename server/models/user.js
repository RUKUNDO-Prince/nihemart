const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 2,
        max:30,
    },
    email: {
    type: String,
    required: true,
    unique: true,
    },
    password: {
        type: String,
        min:5,
    },
    phone: {
        type: Number,
        min: 10,
        max:13,
    }
})

const user = mongoose.model("users", userSchema);
module.exports = user;
