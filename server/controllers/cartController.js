const Cart = require("../models/cart");
const Product = require("../models/product");

// cartController.js
const addToCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity, selectedVariations } = req.query;
    const { _id: userId } = req.user;

    if (!userId) {
      return res.status(400).json({ message: "Authentication required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const cartItem = {
      product: productId,
      name: product.name,
      price: product.price,
      quantity: parseInt(quantity),
      photo: product.photos[0]?.url,
      selectedVariations: selectedVariations ? JSON.parse(selectedVariations) : [],
      subtotal: product.price * parseInt(quantity)
    };

    cart.items.push(cartItem);
    await cart.save();

    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

const getCart = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "name price photo quantity subtotal"
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    console.log("Cart Object:", JSON.stringify(cart, null, 2));

    return res.status(200).json({
      cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const index = cart.items.findIndex((item) => item._id.equals(itemId));
    if (index === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    const deletedItem = cart.items.splice(index, 1)[0];
    await cart.save();

    return res
      .status(200)
      .json({ message: "Item deleted successfully", item: deletedItem });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addToCart, getCart, deleteCartItem };
