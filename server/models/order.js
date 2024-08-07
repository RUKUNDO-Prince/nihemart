const mongoose = require("mongoose");

// Define the productDetails schema
const productDetailsSchema = new mongoose.Schema({
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
  variation: {
    type: [String],
    required: true,
  },
});

// Define the orderDetails schema
const orderDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  deliveryFee: {
    type: Number,
    required: true,
  },
  productDetails: {
    type: [productDetailsSchema],
    required: true,
  },
  status: {
    type: String,
    enum: ["processing", "completed", "cancelled"],
    default: "processing",
  },
},{
  timestamps: true,
});

// Create the model from the schema and export it
const OrderDetails = mongoose.model("OrderDetails", orderDetailsSchema);

module.exports = OrderDetails;
