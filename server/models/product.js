const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  phoneNumber: String,
  location: {
    city: String,
    destination: String,
    fee: Number,
  },
});

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
  },
  photos: [
    {
      type: String,
    },
  ],
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      userInfo: {
        type: userSchema,
      },
    },
  ],
  ratings: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
  ],
  category: {
    type: String,
    required: true,
  },
});

productSchema.virtual("averageRating").get(function () {
  if (this.ratings.length === 0) return 0;

  const sum = this.ratings.reduce((total, rating) => total + rating.rating, 0);
  return sum / this.ratings.length;
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
// export default Product
