const express = require("express");
const productRouter = express.Router();
const { addProduct, likeProduct , redirectToWhatsApp, getAllProducts} = require("../controllers/productController");
const upload = require("../controllers/productController").upload;
const { authenticate } = require("../middleware/authMiddleware");
const {adminMiddleware } = require("../middleware/adminMiddleware");

productRouter.post("/addProduct", adminMiddleware ,upload.array('photos', 5),addProduct);
productRouter.post("/:productId/like",authenticate, likeProduct);
productRouter.post("/:productId/order", redirectToWhatsApp);
productRouter.get("/allProducts",getAllProducts);

module.exports = productRouter;
