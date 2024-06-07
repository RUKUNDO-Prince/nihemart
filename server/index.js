const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const accountRouter = require("./routes/account");
const dbConn = require("./config/db");
const authRouter = require("./routes/auth");
const cookieParser = require("cookie-parser");
const productRouter = require("./routes/product");
const contactRouter = require("./routes/contact");
const cartRoute = require("./routes/cart");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc")
const { swaggerDoc } = require("./swagger");
const userRouter=require("./routes/user")
require("dotenv").config();

dotenv.config();
const app = express();

dbConn();

app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/auth", authRouter);
app.use("/account", accountRouter);
app.use("/product", productRouter);
app.use("/contact", contactRouter);
app.use("/cart", cartRoute);
app.use("/user", userRouter)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
