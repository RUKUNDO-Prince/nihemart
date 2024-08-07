const Contact = require("../models/Contact");

const createContact = async (req, res) => {
    try {
      const { name, email, message } = req.body;
      console.log("Request body:", req.body);

      if (!name || !email || !message) {
        return res
          .status(400)
          .json({ message: "Name, email, and message are required" });
      }

      const newContact = new Contact({ name, email, message });
      await newContact.save();

      console.log("Contact created:", newContact);
      res.json({ message: "Contact form submitted successfully" });
    } catch (error) {
      console.error("Error during contact form submission:", error);
      res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = { createContact };