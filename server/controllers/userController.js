const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../model/userModel");
const sendToken = require("../utils/jwtToken");

//......... register
exports.userRegister = catchAsyncError(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is public id ",
      url: "this is url for user avatar",
    },
  });

  sendToken(user, 200, res);
});

//......... login
exports.userLogin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("plz fill all fields ", 404));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("user not found ", 404));
  }

  const isMatchpassword = user.compared(password);
  if (!isMatchpassword) {
    return next(new ErrorHandler("Invalid credential's", 404));
  }
  sendToken(user, 200, res);
});

//............ logout
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("jwtToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logout successfully..........",
  });
});
