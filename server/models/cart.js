const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  photos: [
    {
      type: String,
    },
  ],
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});


productSchema.virtual("subtotal").get(function () {
  return this.price * this.quantity;
});


productSchema.virtual("photo").get(function () {
  return this.photos && this.photos.length > 0 ? this.photos[0] : null;
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
