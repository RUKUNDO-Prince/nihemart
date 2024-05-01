const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
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

cartSchema.virtual("subtotal").get(function () {
  return this.price * this.quantity;
});

cartSchema.virtual("photo").get(function () {
  return this.photos && this.photos.length > 0 ? this.photos[0] : null;
});

module.exports = mongoose.model("Cart", cartSchema);
