const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Notification = require('../models/Notifications');
const io = require ("../index");

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user) => {
  return jwt.sign({ _id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

const signup = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, phone });

    await user.save();

    const notification = await Notification.create({
      type: 'Account creation success',
      message: `User ${user.name} created an account`,
    });
    
    const token = generateToken(user);

    const responseUser = {
      _id:user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
    };

    res
      .status(201)
      .json({ message: "Signup successful", token, user: responseUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);

    const responseUser = {
      _id:user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
    };

    res
      .status(200)
      .json({ message: "Login successful", token,  responseUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signup, login };
