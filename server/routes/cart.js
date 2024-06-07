const express = require("express");
const {
  getCart,
  addToCart,
  deleteCartItem,
} = require("../controllers/cartController");
const { authenticate } = require("../middleware/authMiddleware");
const cartRoute = express.Router();

cartRouter.post("/cart/:productId", authenticate, addToCart);
cartRouter.get("/cart", authenticate, getCart);
cartRouter.delete("/cart/delete/:itemId", authenticate, deleteCartItem);

module.exports = cartRoute;
