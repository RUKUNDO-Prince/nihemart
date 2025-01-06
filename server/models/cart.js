const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
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
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

itemSchema.virtual("subtotal").get(function () {
  return this.price * this.quantity;
});

itemSchema.virtual("photo").get(function () {
  return this.photos && this.photos.length > 0 ? this.photos[0] : null;
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [itemSchema],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Cart", cartSchema);
