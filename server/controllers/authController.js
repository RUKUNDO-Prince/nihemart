const { compare } = require("bcrypt");
const Account = require("../models/admin");
const jwt = require("jsonwebtoken");
// const chalk = require("chalk");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    "secret"
  );
};

const login = async (req, res) => {
  try {
    const data = req.body;
    const user = await Account.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "There is no account with the specified Email" });
    }
    const passwordCorrect = await compare(data.password, user.password);
    if (!passwordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true });
    console.log(res.cookie);
    res.status(200).json({ message: "Logged in Successfully", account: user });
  } catch (error) {
    console.log("Login Error");
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    console.log("Logout Error");
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  login,
  logout,
};
