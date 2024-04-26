const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Product = require("../models/Product");
const AdminPanel=require("../models/adminPanel")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Only admin can add products" });
    }

    const { name, description, price, quantity } = req.body;
    const photos = req.files.map((file) => file.path);

    const product = new Product({
      name,
      description,
      price,
      quantity,
      photos,
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

    const { name, email, phoneNumber, location } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.likes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this product" });
    }

    product.likes.push({
      user: userId,
      userInfo: { name, email, phoneNumber, location },
    });
    await product.save();

    const userInfo = { name, email, phoneNumber, location };
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
module.exports = { addProduct, likeProduct, adminPanelDisplay, upload };



// const likeProduct = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const userId = req.user._id;

//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     if (product.likes.includes(userId)) {
//       return res
//         .status(400)
//         .json({ message: "You have already liked this product" });
//     }

//     product.likes.push(userId);
//     await product.save();

//     res.status(200).json({ message: "Product liked successfully", product });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };




