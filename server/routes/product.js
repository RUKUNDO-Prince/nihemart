const express = require("express");
const productRouter = express.Router();
const { addProduct, likeProduct } = require("../controllers/productController");
const upload = require("../controllers/productController").upload;

productRouter.post("/", upload.array("photos", 5), addProduct);
productRouter.post("/:productId/like", likeProduct);

module.exports = productRouter;
