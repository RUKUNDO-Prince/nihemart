const express = require("express");
const {
  getCart,
  addToCart,
  deleteCartItem,
} = require("../controllers/cartController");
const { authenticate } = require("../middleware/authMiddleware");
const cartRoute = express.Router();

cartRoute.get("/", getCart);
cartRoute.post("/:productId", addToCart);
cartRoute.delete("/delete/:productId", deleteCartItem);

module.exports = cartRoute;
