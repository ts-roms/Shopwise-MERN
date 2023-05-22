const router = require("express").Router();
const Event = require("../models/event.model");
const ErrorHandler = require("../utils/errorHandler");

router.get("/", async (req, res) => {
  try {
    const event = await Event.find();
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    next(new ErrorHandler(error.message, 500));
  }
});
