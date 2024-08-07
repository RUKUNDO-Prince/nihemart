// models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  productsOrdered: { type: Array, required: true },
  orderedQuantity: { type: Number, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'waiting' },
  deliveryFee: { type: Number, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
});

module.exports = mongoose.model('Order', OrderSchema);
