const bcrypt = require("bcrypt");
const Account = require("../models/admin");
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
    return res
      .status(201)
      .json({ message: "Account Created Successfully", account });
  } catch (error) {
    console.log("Creating Account Error");
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createAccount,
};
