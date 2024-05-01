const express = require("express");
const productRouter = express.Router();
const { addProduct, likeProduct , redirectToWhatsApp} = require("../controllers/productController");
const upload = require("../controllers/productController").upload;

productRouter.post("/", upload.array("photos", 5), addProduct);
productRouter.post("/:productId/like", likeProduct);
productRouter.post("/order", redirectToWhatsApp);

module.exports = productRouter;
