const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const ErrorHandler = require("./utils/errorHandler");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}

// import routes
const userRoutes = require("./routes/user.routes");

// routes
app.use("/api/v2/users", userRoutes);

// if error
app.use(ErrorHandler);

module.exports = app;
