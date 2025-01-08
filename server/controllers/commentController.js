const Product = require("../models/product");
const User = require("../models/user");

const addComment = async (req, res) => {
  const { productId } = req.params;
  const { content } = req.body;
  const userId = req.user._id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const comment = {
      user: userId,
      content,
    };

    product.comments.push(comment);
    await product.save();

    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getComments = async (req, res) => {
    const { productId } = req.params;
  
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required." });
    }
  
    try {
      console.log("Fetching comments for productId:", productId);
      const product = await Product.findById(productId).populate("comments.user", "name");
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json({ comments: product.comments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };  

const deleteComment = async (req, res) => {
  const { productId, commentId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const commentIndex = product.comments.findIndex(comment => comment._id.equals(commentId));
    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    product.comments.splice(commentIndex, 1);
    await product.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addComment, getComments, deleteComment }; 