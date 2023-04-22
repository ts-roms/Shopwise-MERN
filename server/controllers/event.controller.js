const Shop = require("../models/shop.model");
const Event = require("../models/event.model");
const ErrorHandler = require("../utils/errorHandler");

exports.createEvent = async (req, res, next) => {
  try {
    const sellerId = req.seller.id;

    const shop = await Shop.findById(sellerId);

    if (!shop) {
      return next(new ErrorHandler("Invalid Seller id", 400));
    }

    const files = req.files;
    const imageUrls = files.map((file) => `${file.filename}`);

    const eventData = req.body;

    eventData.images = imageUrls;
    eventData.shop = shop._id;

    const event = await Event.create(eventData);

    res.status(201).json({ success: true, event });
  } catch (e) {
    console.error(e);
    next(new ErrorHandler(e.message, 500));
  }
};
