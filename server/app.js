const express = require("express");
const ErrorHandler = require("./utils/errorHandler");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}

// if error
app.use(ErrorHandler);

module.exports = app;
