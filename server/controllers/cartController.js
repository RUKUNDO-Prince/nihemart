const Cart = require("../models/cart");
const Product = require("../models/product");

const addToCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { _id: userId } = req.user;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const product = await Product.findById(productId);
    console.log(product);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
      });
    } else {
    }
    const cartItem = cart.items.find((item) => item.product.equals(productId));
    if (cartItem) {
      cartItem.quantity += 1;
      cartItem.subtotal = cartItem.quantity * product.price;
    } else {
      cart.items.push({
        product: productId,
        name: product.name,
        price: product.price,
        quantity: 1,
        photos: product.photos[0],
        subtotal: product.price,
      });
    }
    product.quantity -= 1;
    await cart.save();
    await product.save();
    return res
      .status(200)
      .json({ message: "Product added to your cart successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
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

    return res.status(200).json({
      cart: cart.toObject({ virtuals: true }),
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
