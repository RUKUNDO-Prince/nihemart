const express = require("express");
const productRouter = express.Router();
const { addProduct, likeProduct , redirectToWhatsApp} = require("../controllers/productController");
const upload = require("../controllers/productController").upload;
const { authenticate } = require("../middleware/authMiddleware");

productRouter.post("/", upload.array('photos', 5), addProduct);
productRouter.post("/:productId/like",authenticate, likeProduct);
productRouter.post("/:productId/order", redirectToWhatsApp);

module.exports = productRouter;
