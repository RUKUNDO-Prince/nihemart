const cartModel = require("../models/cart");
const productModel = require("../models/product");

const addToCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      cart = new cartModel({
        user: userId,
        items: [],
      });
    }

    const cartItem = cart.items.find((item) => item.product.equals(productId));
    if (cartItem) {
      cartItem.quantity += 1;
      product.quantity -= 1;
    } else {
      cart.items.push({
        product: productId,
        name: product.name,
        price: product.price,
        quantity: 1,
        photo: product.photo,
        subtotal: product.price,
      });
      product.quantity -= 1;
    }

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
    const userId = req.user._id;
    const cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const populatedCart = await cartModel.populate(cart, {
      path: "items.product",
      select: "name price photo quantity subtotal",
    });

    return res.status(200).json({ cart: populatedCart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { userId } = req.user;
    const { itemId } = req.params;

    const cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const index = cart.items.findIndex((item) => item._id.equals(itemId));
    if (index === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    const deletedItem = cart.items.splice(index, 1);
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
