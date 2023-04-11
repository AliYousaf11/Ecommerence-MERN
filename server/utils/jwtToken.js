const sendToken = (user, statusCode, res) => {
  // generate token after login and register...
  const token = user.getJwtToken();

  // set cookies expires time.....
  const options = {
    expires: new Date(
      Date.now() + process.env.CookieExpires * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // send this response....
  res.status(statusCode).cookie("token", options).json({
    success: true,
    token,
    user,
    message: "user successfully...",
  });
};

module.exports = sendToken;
