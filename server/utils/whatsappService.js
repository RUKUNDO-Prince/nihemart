const axios = require('axios');

const sendWhatsAppMessage = async (phoneNumber, message) => {
  const url = `https://graph.facebook.com/v13.0/250784148374/messages`;
  const token = process.env.WHATSAPP_ACCESS_TOKEN; // Your access token

  const data = {
    messaging_product: "whatsapp",
    to: phoneNumber,
    text: { body: message },
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log("WhatsApp message sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending WhatsApp message:", error.response.data);
  }
};

module.exports = {
  sendWhatsAppMessage,
}; 