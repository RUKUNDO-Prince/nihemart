const express = require("express");
const { createAccount } = require("../controllers/accountController");
const { authenticate } = require("../middleware/authMiddleware");

const accountRouter = express.Router();

accountRouter.post("/", authenticate, createAccount);
// accountRouter.use(authenticate);



module.exports = accountRouter;
