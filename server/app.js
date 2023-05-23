const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const ErrorHandler = require("./middleware/error");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(logger("dev"));
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}

// import routes
const userRoutes = require("./routes/user.routes");
const shopRoutes = require("./routes/shop.routes");
const productRoutes = require("./routes/product.routes");
const couponRoutes = require("./routes/coupons.routes");
const paymentRoutes = require("./routes/payment.routes");
const orderRoutes = require("./routes/order.routes");
const eventRoutes = require("./routes/event.routes");

// routes
app.use("/api/v2/coupons", couponRoutes);
app.use("/api/v2/users", userRoutes);
app.use("/api/v2/shops", shopRoutes);
app.use("/api/v2/products", productRoutes);
app.use("/api/v2/payments", paymentRoutes);
app.use("/api/v2/orders", orderRoutes);
app.use("/api/v2/events", eventRoutes);

// if error
app.use(ErrorHandler);

module.exports = app;
