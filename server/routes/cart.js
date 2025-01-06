const express = require("express");
const {
  getCart,
  addToCart,
  deleteCartItem,
} = require("../controllers/cartController");

const { authenticate } = require("../middleware/authMiddleware");
const cartRoute = express.Router();

cartRoute.post("/:productId", authenticate, addToCart);
cartRoute.get("/", authenticate, getCart);
cartRoute.delete("/delete/:itemId", authenticate, deleteCartItem);

module.exports = cartRoute;
