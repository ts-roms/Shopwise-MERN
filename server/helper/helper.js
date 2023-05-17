exports.createActivationToken = (user, expirationDate) => {
  // return jwt.sign(user, process.env.ACTIVATION_SECRET, {
  //   expiresIn: "5m",
  // });

  const randomString =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const encodedString = Buffer.from(
    `${randomString}|${JSON.stringify(user)}|${expirationDate.getTime()}`
  ).toString("base64");
  return encodedString;
};

exports.decodeActivationToken = (encodedString) => {
  const decodedString = Buffer.from(encodedString, "base64").toString("utf8");
  const [randomString, encodedUser, expirationTime] = decodedString.split("|");
  const decodedUser = JSON.parse(encodedUser);

  if (parseInt(expirationTime, 10) < Date.now()) {
    return next(new ErrorHandler("Expiration time has passed", 400));
  }
  return decodedUser;
};

exports.getCartItemPrice = (item) => {
  return item.discount_percentage > 0 ? item.discount_price : item.price;
};
