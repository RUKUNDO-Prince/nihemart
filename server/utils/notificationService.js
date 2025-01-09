const nodemailer = require("nodemailer");

// Configure your email transport using nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your email service
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

// Function to send email notifications
const sendEmailToAdmin = async (order) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL, // Admin email to receive notifications
    subject: "New Order Notification",
    text: `A new order has been placed:\n\nName: ${order.name}\nPhone: ${order.phone}\nAddress: ${order.fullAddress}\nTotal: ${order.productDetails.reduce((acc, product) => acc + product.price * product.quantity, 0)} Frw`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = {
  sendEmailToAdmin,
}; 