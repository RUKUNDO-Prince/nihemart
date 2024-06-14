const express = require("express");
const { authenticate } = require("../middleware/authMiddleware");
const { login, signup } = require("../controllers/userController");

const authRouter = express.Router();

authRouter.post("/login",login);
authRouter.post("/signup", signup);

module.exports = authRouter;
    