const OrderDetails = require("../models/order");

// Add a new order
const addOrder = async (req, res) => {
  const { name, phone, province, city, deliveryFee, productDetails } = req.body;
  try {
    const order = new OrderDetails({
      name,
      phone,
      province,
      city,
      deliveryFee,
      productDetails,
    });

    await order.save();
    res.status(201).json({ message: "Order added successfully" });
  } catch (error) {
    res.status(400).json({ error: "failed to order, try again from home" });
  }
};

// Update the status of an order
const updateOrderStatus = async (req, res) => {
  const id = req.params.id;
  const newStatus = req.body.status;
  console.log(newStatus);
  try {
    const order = await OrderDetails.findByIdAndUpdate(
      id,
      { status: newStatus }
    );
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(201).json({ message: "status updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get the total number of orders
const getTotalOrders = async (req, res) => {
  try {
    const count = await OrderDetails.countDocuments();
    res.status(201).json({ totalOrders: count });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderDetails.find();
    res.status(201).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get order by id
const getOrderById = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await OrderDetails.findById(id);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await OrderDetails.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(201).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "failed to delete order" });
  }
};

module.exports = {
  addOrder,
  updateOrderStatus,
  deleteOrder,
  getTotalOrders,
  getAllOrders,
  getOrderById
};
