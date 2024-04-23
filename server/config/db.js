const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

const dbConn = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/niheMart", {
      autoIndex: true,
    });
    console.log("Db connected..........");
  } catch (error) {
    console.log("Db connection Error");
    console.log(error);
  }
};

module.exports = dbConn;
