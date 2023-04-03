exports.sendToken = (user, statuscode, res) => {
  const token = user.getJwtToken();

  options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res
    .status(statuscode)
    .cookie("token", token, options)
    .json({ success: true, user, token });
};
