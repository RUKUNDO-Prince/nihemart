const express = require("express");
const productRouter = express.Router();
const {
  addProduct,
  likeProduct,
  redirectToWhatsApp,
  getAllProducts,
  getProductById,
  getSearchResults,
} = require("../controllers/productController");
const { authenticate,upload } = require("../middleware/authMiddleware");
const { adminMiddleware } = require("../middleware/adminMiddleware");


productRouter.post(
  "/addProduct",
  adminMiddleware,
  upload.array("files", 10),
  addProduct
);
productRouter.post("/:productId/like", authenticate, likeProduct);
productRouter.post("/:productId/order", redirectToWhatsApp);
productRouter.get("/allProducts", getAllProducts);
productRouter.get("/singleProduct/:productId",getProductById);
productRouter.get("/search",getSearchResults);

module.exports = productRouter;
