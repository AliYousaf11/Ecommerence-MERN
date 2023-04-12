const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

//user authenticate or not .......
exports.isAuthUser = catchAsyncError(async (req, res, next) => {
  const { jwtToken } = req.cookies;

  if (!jwtToken) {
    return next(new ErrorHandler("plz 1st login then access it.", 401));
  }

  const decodedData = jwt.verify(jwtToken, process.env.SecrectKey);
  req.user = await User.findById(decodedData.id);
  next();
});
