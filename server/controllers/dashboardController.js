const Product = require("../models/product");
const OrderDetails = require("../models/order");   


const getDashboardStats = async (req, res) => {
    try {
      // Get total number of products
      const totalProducts = await Product.countDocuments({});
  
      // Get number of products that have been updated
      const updatedProducts = await Product.countDocuments({ updated: true });
  
      // Get total number of orders
      const totalOrders = await OrderDetails.countDocuments({});
  
      // Send the response
      res.status(201).json({
        totalProducts,
        updatedProducts,
        totalOrders,
      });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching the dashboard stats." });
    }
  };
  
  module.exports = {
    getDashboardStats,
  };