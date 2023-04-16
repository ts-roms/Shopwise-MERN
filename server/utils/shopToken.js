exports.sendShopToken = (seller, statuscode, res) => {
  //   const token = user.getJwtToken();

  const token = seller.getJwtToken();

  options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res
    .status(statuscode)
    .cookie("seller_token", token, options)
    .json({ success: true, seller, token });
};
