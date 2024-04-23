const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const accountRouter = require("./routes/account");
const dbConn = require("./config/db");
const authRouter = require("./routes/auth");
const cookieParser = require("cookie-parser");
// const chalk = require("chalk");

dotenv.config();
const app = express();

dbConn();
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/account", accountRouter);
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
