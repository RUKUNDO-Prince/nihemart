const Product = require("../models/product");
const OrderDetails = require("../models/order");
const { displayNumbers } = require("../utils/usableFuncs");
const { sendEmailToAdmin } = require("../utils/emailService");
const { sendWhatsAppMessage } = require("../utils/whatsappService");

// Add a new order
const addOrder = async (req, res) => {
  const { name, phone, province, city, deliveryFee, fullAddress, productDetails } = req.body;

  // Check if productDetails is defined and has at least one item
  if (!productDetails || productDetails.length === 0) {
    return res.status(400).json({ message: "No product details provided." });
  }

  const directOrder = productDetails[0].directOrder;

  try {
    const order = new OrderDetails({
      name,
      phone,
      province,
      city,
      deliveryFee,
      fullAddress,
      productDetails,
    });

    await order.save();

    // Send email and WhatsApp notifications
    await sendEmailToAdmin(order);
    await sendWhatsAppMessage(phone, `Your order has been placed successfully!`);

    if (directOrder !== undefined && directOrder === true) {
      const product = await Product.findById(productDetails[0].productId);
      product.quantity -= productDetails[0].quantity;
      await product.save();
    }

    res.status(201).json({ message: "Order added successfully" });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Failed to place order, please try again." });
  }
};

// Update the status of an order
const updateOrderStatus = async (req, res) => {
  const id = req.params.id;
  const newStatus = req.body.status;

  console.log(newStatus);
  
  try {
    const order = await OrderDetails.findById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // If the status is being changed to 'cancelled', re-add the product quantities
    if (newStatus === "cancelled" && order.status !== "cancelled") {
      for (const item of order.productDetails) {
        const product = await Product.findById(item.productId);
        if (product) {
          product.quantity += item.quantity;
          await product.save();
        }
      }
    }

    // Update the order status
    order.status = newStatus;
    await order.save();

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
  const { sortBy } = req.query; // Get sorting parameter
  try {
    let orders;
    if (sortBy === "date") {
      orders = await OrderDetails.find().sort({ createdAt: -1 });
    } else if (sortBy === "category") {
      orders = await OrderDetails.find().sort({ category: 1 });
    } else if (sortBy === "status") {
      orders = await OrderDetails.find().sort({ status: 1 });
    } else {
      orders = await OrderDetails.find();
    }
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
    const order = await OrderDetails.findById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // If the order is still "processing", re-add the product quantities
    if (order.status === "processing") {
      for (const item of order.productDetails) {
        const product = await Product.findById(item.id);
        if (product) {
          product.quantity += item.quantity;
          await product.save();
        }
      }
    }

    await order.deleteOne();
    res.status(201).json({ message: "Order deleted" });
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
  getOrderById,
};
