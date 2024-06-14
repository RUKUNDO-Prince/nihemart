const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const userSchema = require("../models/user");
const jwt = require("jsonwebtoken");

const { genSalt, hash } = bcrypt;

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin
    },
    process.env.JWT_SECRET
  );
};

// creating admin account

const createAdminAccount = async (req, res) => {
  try {
    const data = req.body;
    const checkUniqueEmail = await Admin.findOne({ email: data.email });
    if (checkUniqueEmail) {
      return res.status(409).json({ message: "Email is already in use" });
    }
    const salt = await genSalt(10);
    const hashedPassword = await hash(data.password, salt);
    const adminAccount = new Admin({
      name: data.name,
      password: hashedPassword,
      email: data.email,
    });
    await adminAccount.save();
    const token = generateToken(adminAccount);

    return res.status(201).json({
      message: "adminAccount Created Successfully",
      adminAccount: {
        name: adminAccount.name,
        email: adminAccount.email,
        emailVerified: adminAccount.emailVerified,
      },
      token
    });
  } catch (error) {
    console.log(" Error Creating adminAccount");
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// admin account login

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).send("Email or password incorrect");
    }
    if (!admin.password) {
      return res.status(404).send("admin password not found");
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(404).send("Incorrect email or password");
    }
    const token = jwt.sign(
      {
        id: admin._id,
        name: admin.name,
        isAdmin: admin.isAdmin,
      },
      process.env.JWT_SECRET
    );
    return res.status(200).json({
      message: " Admin logged in successfully",
      adminAccount:{
        name: admin.name,
        email: adminAccount.email,
        emailVerified: adminAccount.emailVerified,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  createAdminAccount,
  adminLogin,
};
