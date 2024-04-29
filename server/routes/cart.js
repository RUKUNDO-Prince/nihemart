const express = require("express")
const { getCart, addToCart, deleteCartItem } = require("../controllers/cartController");
const { authenticate } = require("../middleware/authMiddleware");
const cartRoute = express.Router()

cartRoute.get("/", getCart);
accountRouter.use(authenticate);
cartRoute.post("/", addToCart);
cartRoute.delete("/:id", deleteCartItem);

module.exports = cartRoute;