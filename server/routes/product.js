const express = require("express");
const productRouter = express.Router();
const {
  addProduct,
  editProduct,
  deleteProduct,
  likeProduct,
  redirectToWhatsApp,
  getAllProducts,
  getProductById,
  getSearchResults,
  unLikeProduct,
  getAllLikedProduct,
} = require("../controllers/productController");
const { authenticate, upload } = require("../middleware/authMiddleware");
const { adminMiddleware } = require("../middleware/adminMiddleware");

productRouter.post(
  "/addProduct",
  adminMiddleware,
  upload.array("files", 15),
  addProduct
);

productRouter.put(
  "/editProduct/:productId",
  adminMiddleware,
  upload.array("files", 10),
  editProduct
);

productRouter.delete(
  "/deleteProduct/:productId",
  adminMiddleware,
  deleteProduct
);

productRouter.post("/:productId/like", authenticate, likeProduct);
productRouter.post("/:productId/unlike", authenticate, unLikeProduct);
productRouter.post("/likes/all", authenticate, getAllLikedProduct);
productRouter.post("/:productId/order", redirectToWhatsApp);
productRouter.get("/allProducts", getAllProducts);
productRouter.get("/singleProduct/:productId", getProductById);
productRouter.get("/search", getSearchResults);

module.exports = productRouter;
