const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const AdminRouter = require("./routes/adminAccount");
const dbConn = require("./config/db");
const cookieParser = require("cookie-parser");
const productRouter = require("./routes/product");
const contactRouter = require("./routes/contact");
const cartRoute = require("./routes/cart");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const { swaggerDoc } = require("./swagger");
const userRouter = require("./routes/user");
const OrderRouter = require("./routes/order");
const cors = require("cors");
const http = require("http");
const {Server} = require("socket.io");
const path = require('path');
const commentRouter = require("./routes/comment");
require("dotenv").config();



dotenv.config();
const app = express();

const server = http.createServer(app);
const io = new Server(server);


dbConn();


// added cors middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true,
  })
);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads', 'images')));

app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/admin", AdminRouter);
app.use("/product", productRouter);
app.use("/contact", contactRouter);
app.use("/cart", cartRoute);
app.use("/user", userRouter);
app.use("/orders", OrderRouter);
app.use("/comments", commentRouter);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

