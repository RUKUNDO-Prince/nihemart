const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
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
    default: 0
  },
  hasVariations: {
    type: Boolean,
    default: false
  },
  attributes: [
    {
      name: {
        type: String,
        required: true,
      },
      values: [{ type: String, required: true }],
    },
  ],
  variations: [
    {
      variation: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      stock: {
        type: Number,
        required: true,
        default: 0,
      },
      image: {
        type: String,
        required: false
      },
    },
  ],
  discount: {
    type: Number,
    default: 0,
  },
  discountType: {
    type: String,
    enum: ['percentage', 'amount', ''],
    default: ''
  },
  photos: [
    {
      url: {
        type: String,
        required: true
      },
      isDefault: {
        type: Boolean,
        default: false
      }
    }
  ],
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Boolean,
    default: false,
  },
});

productSchema.virtual("averageRating").get(function () {
  if (!this.ratings || this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((total, rating) => total + rating.rating, 0);
  return sum / this.ratings.length;
});

productSchema.virtual("priceAfterDiscount").get(function () {
  if (this.discount === 0) return this.price;

  if (this.discountType === "percentage") {
    const discountAmount = (this.price * this.discount) / 100;
    return this.price - discountAmount;
  }

  if (this.discountType === "Amount") {
    return this.price - this.discount;
  }
});

productSchema.virtual("totalStock").get(function () {
  if (!this.variations || this.variations.length === 0) {
    return this.quantity;
  }
  return this.variations.reduce((total, variation) => total + variation.stock, 0);
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
