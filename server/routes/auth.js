const express = require("express");
const { login, logout } = require("../controllers/authController");
const { authenticate } = require("../middleware/authMiddleware");

const authRouter = express.Router();

authRouter.use("/logout", authenticate);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

module.exports = authRouter;
