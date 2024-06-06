const express = require("express");
const { login, signup } = require("../controllers/accountController");
const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/signup", signup);
