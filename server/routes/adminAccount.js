const express = require("express");
const { createAdminAccount, adminLogin } = require("../controllers/adminController");

const AdminRouter = express.Router();

AdminRouter.post("/register", createAdminAccount);
AdminRouter.post("/login",adminLogin);




module.exports = accountRouter;
