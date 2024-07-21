const express = require("express");
const {
  getCart,
  addToCart,
  deleteCartItem,
} = require("../controllers/cartController");

const { authenticate } = require("../middleware/authMiddleware");
const cartRoute = express.Router();

cartRoute.post("/cart/:productId", authenticate, addToCart);
cartRoute.get("/cart", authenticate, getCart);
cartRoute.delete("/cart/delete/:itemId", authenticate, deleteCartItem);

module.exports = cartRoute;
