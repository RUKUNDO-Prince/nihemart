const bcrypt = require("bcrypt");
const Account = require("../models/admin");
const userSchema = require("../models/user");
// const chalk = require("chalk");

const { compare, genSalt, hash } = bcrypt;
// SOME CHANGES

const createAccount = async (req, res) => {
  try {
    const data = req.body;
    const checkUniqueEmail = await Account.findOne({ email: data.email });
    if (checkUniqueEmail) {
      return res.status(409).json({ data: "Email is already in use" });
    }
    const salt = await genSalt(10);
    const hashedPassword = await hash(data.password, salt);
    const account = new Account({
      name: data.name,
      password: hashedPassword,
      email: data.email,
    });
    await account.save();

    return res.status(201).json({
      message: "Account Created Successfully",
      account: {
        name: account.name,
        email: account.email,
        emailVerified: account.emailVerified,
      },
    });
  } catch (error) {
    console.log("Creating Account Error");
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!(name && email && password)) {
      return res.status(400).send("All fields are compulsory");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await usersSchema.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    user.token = token;
    await user.save();

    return res.status(201).json({
      message: "Signup successful.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).send("Email or password incorrect");
    }
    if (!user.password) {
      return res.status(404).send("User password not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(404).send("Incorrect email or password");
    }
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
      },
      process.env.JWT_SECRET
    );
    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  createAccount,
  signup,
  login,
};
