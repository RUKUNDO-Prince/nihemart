const mongoose = require('mongoose');
const Product = require("../models/product");
const AdminPanel = require("../models/adminPanel");
const Notification = require("../models/Notifications");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      subCategory,
      category,
      discountType,
      discount,
      hasVariations,
      defaultImageIndex
    } = req.body;

    // Parse price as a number and validate
    const price = parseFloat(req.body.price);
    if (isNaN(price) || price < 0) {
      return res.status(400).json({ 
        message: "Please provide a valid price" 
      });
    }

    let variations = [];
    let attributes = [];
    let quantity = parseInt(req.body.quantity) || 0;

    // Process main product photos
    const photos = Array.isArray(req.files) 
      ? req.files.map((file, index) => ({
          url: file.filename,
          isDefault: index === parseInt(defaultImageIndex || 0)
        }))
      : [];

    if (hasVariations === 'true') {
      try {
        variations = JSON.parse(req.body.variations).map(variation => ({
          ...variation,
          price: parseFloat(variation.price),
          stock: parseInt(variation.stock) || 0,
          image: variation.image ? variation.image : undefined
        }));
        attributes = JSON.parse(req.body.attributes);

        // Validate variations
        for (const variation of variations) {
          if (!variation.variation || isNaN(variation.price) || typeof variation.stock !== 'number') {
            return res.status(400).json({
              message: "Each variation must include a variation name, valid price, and stock number.",
            });
          }
        }

        // Calculate total stock from variations
        quantity = variations.reduce((total, v) => total + (v.stock || 0), 0);
      } catch (error) {
        return res.status(400).json({
          message: "Invalid variation data provided",
          error: error.message
        });
      }
    }

    const product = new Product({
      name,
      description,
      price,
      quantity,
      subCategory,
      category,
      discountType: discountType || '',
      discount: parseFloat(discount) || 0,
      hasVariations: hasVariations === 'true',
      variations,
      attributes,
      photos,
      createdAt: Date.now(),
    });

    await product.save();

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Product addition error:", error);
    res.status(500).json({ 
      message: "Failed to add product", 
      error: error.message 
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    let updates = req.body;

    // Validate productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Handle photos
    if (Array.isArray(req.files) && req.files.length > 0) {
      const defaultImageIndex = Number.isInteger(Number(updates.defaultImageIndex))
        ? parseInt(updates.defaultImageIndex)
        : 0;

      // Fetch existing product to merge photos
      const existingProduct = await Product.findById(productId);
      const existingPhotos = existingProduct.photos || [];

      updates.photos = [
        ...existingPhotos,
        ...req.files.map((file, index) => ({
          url: "/" + file.filename,
          isDefault: index === defaultImageIndex,
        })),
      ];
    }

    // Handle variations
    if (updates.hasVariations === 'true') {
      updates.variations = JSON.parse(updates.variations || '[]');
      updates.attributes = JSON.parse(updates.attributes || '[]');

      for (const variation of updates.variations) {
        if (
          typeof variation.variation !== 'string' ||
          typeof variation.price !== 'number' ||
          typeof variation.stock !== 'number'
        ) {
          return res.status(400).json({
            message: "Each variation must include a valid name (string), price (number), and stock (number).",
          });
        }
      }

      updates.quantity = updates.variations.reduce((total, v) => total + (v.stock || 0), 0);
    } else {
      updates.variations = [];
      updates.attributes = [];
    }

    console.log("Received updates:", updates);

    // Update product in database
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
    const isProduction = process.env.NODE_ENV === 'production';
    res.status(500).json({
      message: isProduction ? "Internal server error" : error.message,
    });
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
      photo: product.photos.find(p => p.isDefault)?.url || product.photos[0]?.url
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