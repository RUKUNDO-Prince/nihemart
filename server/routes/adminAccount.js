const express = require("express");
const {
  createAdminAccount,
  adminLogin,
} = require("../controllers/adminController");
const { getDashboardStats } = require("../controllers/dashboardController");
const { adminMiddleware } = require("../middleware/adminMiddleware");

const AdminRouter = express.Router();

AdminRouter.post("/register", createAdminAccount);
AdminRouter.post("/login", adminLogin);
AdminRouter.get("/dashboard", adminMiddleware, getDashboardStats);

module.exports = AdminRouter;
