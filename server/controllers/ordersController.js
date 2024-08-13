const Product = require("../models/product");
const OrderDetails = require("../models/order");
const { displayNumbers } = require("../utils/usableFuncs");
const { sendEmailToAdmin } = require("../utils/emailService");

// Add a new order
const addOrder = async (req, res) => {
  const { name, phone, province, city, deliveryFee, productDetails } = req.body;

  const directOrder = productDetails[0].directOrder;

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

    if (directOrder !== undefined && directOrder === true) {
      const product = await Product.findById(productDetails[0].productId);

      product.quantity -= productDetails[0].quantity;

      await product.save();
    }

    const totalPrice = order.productDetails.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);

    const subject = "New Order Placed";
    // Format the email message
    const emailBody = `
     <h2>New Order Placed</h2>
     <p><strong>Name:</strong> ${order.name}</p>
     <p><strong>Phone:</strong> ${order.phone}</p>
     <p><strong>Province:</strong> ${order.province}</p>
     <p><strong>City:</strong> ${order.city ? order.city : order.province}</p>
     <p><strong>Delivery Fee:</strong> ${displayNumbers(
       order.deliveryFee
     )} Frw</p>
     <p><strong>Product Details:</strong></p>
     <ul>
       ${order.productDetails
         .map(
           (item) =>
             `<li>${item.name} (Qty: ${
               item.quantity
             }, subtotal: ${displayNumbers(
               item.quantity * item.price
             )}) Frw</li>`
         )
         .join("")}
     </ul>
     <p><strong>total price:</strong> ${displayNumbers(totalPrice)} Frw</p>
   `;

    // Send the email using the utility function
    await sendEmailToAdmin(subject, emailBody);

    res.status(201).json({ message: "Order added successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "failed to order, try again from home" });
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
