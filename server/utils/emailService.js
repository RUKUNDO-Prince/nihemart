// utils/emailService.js
const nodemailer = require('nodemailer');

// Creating the transporter service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Admin email address
const adminEmail = process.env.ADMIN_EMAIL;


const sendEmailToAdmin = async (subject, html) => {
  try {
    await transporter.sendMail({
      from: `"NiheMart" <${process.env.EMAIL_USER}>`, // Customize the sender name and email
      to: adminEmail,
      subject: subject,
      html: html,
    });
    console.log('Email sent to admin successfully');
  } catch (error) {
    console.error('Failed to send email to admin:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = {
  sendEmailToAdmin,
};
