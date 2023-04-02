const jwt = require("jsonwebtoken");

exports.createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, { expiresIn: "10m" });
};
