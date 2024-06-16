const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Product = require("../models/product");
const AdminPanel = require("../models/adminPanel");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      category,
      size,
      gender,
      discountType,
      discount,
    } = req.body;

    const photos = Array.isArray(req.files)
      ? req.files.map((file) => "images/" + file.filename)
      : [];

    const product = new Product({
      name,
      description,
      price,
      quantity,
      category,
      photos,
      size,
      discountType,
      gender,
      discount,
    });

    await product.save();

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const likeProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const { name, email, phoneNumber, city, destination, fee } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.likes.some((like) => like.user.equals(userId))) {
      return res
        .status(400)
        .json({ message: "You have already liked this product" });
    }

    product.likes.push({
      user: userId,
      userInfo: {
        name,
        email,
        phoneNumber,
        location: { city, destination, fee },
      },
    });
    await product.save();

    const userInfo = {
      name,
      email,
      phoneNumber,
      location: { city, destination, fee },
    };
    adminPanelDisplay(userInfo);

    res.status(200).json({ message: "Product liked successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
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
  } catch (error) {}
};

module.exports = {
  addProduct,
  likeProduct,
  adminPanelDisplay,
  redirectToWhatsApp,
  getProductsByCategory,
  getAllProducts,
  getProductById
};
