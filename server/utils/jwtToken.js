const sendToken = (user, statusCode, res) => {
  // generate token after login and register...
  const token = user.getJwtToken();
  res
    .status(statusCode)
    .cookie("jwtToken", token, {
      maxAge: 2 * 60000,
      httpOnly: true,
    })
    .json({
      success: true,
      token,
      user,
      message: "user successfully...",
    });
};

module.exports = sendToken;
