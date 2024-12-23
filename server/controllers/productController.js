const Product = require("../models/product");
const AdminPanel = require("../models/adminPanel");
const Notification = require("../models/Notifications");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      subCategory,
      category,
      discountType,
      discount,
    } = req.body;

    const variations = JSON.parse(req.body.variations);
    const attributes = JSON.parse(req.body.attributes);
    const photos = Array.isArray(req.files)
      ? req.files.map((file) => "images/" + file.filename)
      : [];

    // Validate variations
    for (const variation of variations) {
      if (!variation.variation || !variation.price || typeof variation.stock !== 'number') {
        return res.status(400).json({
          message: "Each variation must include a variation name, price, and stock number.",
        });
      }
    }

    // Calculate total stock from variations or use base quantity
    const quantity = variations.length > 0 
      ? variations.reduce((total, v) => total + (v.stock || 0), 0)
      : req.body.quantity || 0;

    const product = new Product({
      name,
      description,
      price,
      quantity,
      subCategory,
      category,
      discountType,
      discount,
      variations,
      attributes,
      photos,
      createdAt: Date.now(),
    });

    await product.save();

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updates = req.body;

    if (req.files && req.files.length > 0) {
      updates.photos = req.files.map((file) => "images/" + file.filename);
    }

    // Parse and validate variations if provided
    if (updates.variations) {
      const variations = JSON.parse(updates.variations);

      for (const variation of variations) {
        if (!variation.variation || !variation.price || typeof variation.stock !== 'number') {
          return res.status(400).json({
            message: "Each variation must include a variation name, price, and stock number.",
          });
        }
      }

      // Update total quantity based on variation stocks
      updates.quantity = variations.reduce((total, v) => total + (v.stock || 0), 0);
      updates.variations = variations;
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      { ...updates, updated: true },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const likeProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;
    const username = req.user.name;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.likes.some((like) => like.user.equals(userId))) {
      product.likes.pop({ user: userId });
      await product.save();
      return res.status(201).json({ message: "disliked the product" });
    }

    product.likes.push({
      user: userId,
    });
    await product.save();

    const notification = await Notification.create({
      type: 'user Liked product',
      message: `${username} liked a product`,
    });

    res.status(201).json({ message: "Product liked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "not liking the product" });
  }
};

const unLikeProduct = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;
  const username = req.user.name;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.likes.some((like) => like.user.equals(userId))) {
      product.likes.pop({ user: userId });

      await product.save();

      const notification = await Notification.create({
        type: 'user disliked a product',
        message: `${username} disliked a product`,
      });
  
      return res.status(201).json({ message: "disliked the product" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "failed to dislike product" });
  }
};

const getAllLikedProduct = async (req, res) => {
  const userId = req.user._id;
  try {
    const products = await Product.find({
      likes: { $elemMatch: { user: userId } },
    });
    if (!products) {
      return res.status(201).json({ message: "no liked Product so far" });
    }

    const productsWithPhotos = products.map((product) => ({
      ...product.toObject({ virtuals: true }),
      photo: product.photos.length > 0 ? product.photos[0] : null,
    }));
    return res.status(201).json(productsWithPhotos);
  } catch (error) {
    return res.status(500).json({ error: "failed to get liked products" });
  }
};

const adminPanelDisplay = async (userInfo) => {
  try {
    let adminPanel = await AdminPanel.findOne({ email: userInfo.email });
    if (!adminPanel) {
      adminPanel = new AdminPanel(userInfo);
    } else {
      adminPanel.name = userInfo.name;
      adminPanel.phoneNumber = userInfo.phoneNumber;
      adminPanel.location = userInfo.location;
    }
    await adminPanel.save();
  } catch (error) {
    console.error("Error displaying user information to admin panel:", error);
  }
};

const redirectToWhatsApp = (req, res) => {
  try {
    const sellerNumber = "+250788515608";
    const message = "Hello, I've liked this product.";
    const whatsappLink = `https://api.whatsapp.com/send?phone=${encodeURIComponent(
      sellerNumber
    )}&text=${encodeURIComponent(message)}`;

    return res.redirect(whatsappLink);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });

    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }

    const productsWithPhotos = products.map((product) => ({
      ...product.toObject(),
      photo: product.photos.length > 0 ? product.photos[0] : null,
    }));

    res.status(200).json({ products: productsWithPhotos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const Products = await Product.find({});
    if (!Products) {
      return res.status(404).json({ message: "No products found" });
    }
    const productsWithPhotos = Products.map((product) => ({
      ...product.toObject({ virtuals: true }),
      photo: product.photos.length > 0 ? product.photos[0] : null,
    }));

    res.status(200).json({ products: productsWithPhotos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product: product.toObject({ virtuals: true }) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSearchResults = async (req, res) => {
  const { searchQuery } = req.query;

  const searchCriteria = {
    $or: [
      { name: { $regex: searchQuery, $options: "i" } }, // case-insensitive search
      { description: { $regex: searchQuery, $options: "i" } },
      { category: { $regex: searchQuery, $options: "i" } },
      { subCategory: { $regex: searchQuery, $options: "i" } },
    ],
  };

  try {
    const products = await Product.find(searchCriteria);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addProduct,
  editProduct,
  deleteProduct,
  likeProduct,
  adminPanelDisplay,
  redirectToWhatsApp,
  getProductsByCategory,
  getAllProducts,
  getProductById,
  getSearchResults,
  unLikeProduct,
  getAllLikedProduct,
};