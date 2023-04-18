const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../model/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const Product = require("../model/productModel");

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
  const isMatchpassword = await user.compared(password);
  if (!isMatchpassword) {
    return next(new ErrorHandler("Invalid credential's", 404));
  }

  await user.save();
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

//............ forgot password
exports.forgetpassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found ", 401));
  }

  // get reset password
  const resetToken = user.getresetPassword();

  // before save the user.....
  await user.save({ validateBeforeSave: false });

  // reset password url.......
  const resetpasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  // message that is send to target or user email .......
  const message = `you password reset token is \n\n ${resetpasswordUrl} \n\n if you have'nt request this email then you can ignore it `;

  try {
    await sendEmail({
      email: user.email,
      subject: "Ali yousaf Ecommerence site password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `email send to ${user.email} successfully......`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//............ reset user password
exports.resetuserPassword = catchAsyncError(async (req, res, next) => {
  // creating token hash......
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // find user by token and expire it time.....
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  // user token find or not......
  if (!user) {
    return next(
      new ErrorHandler("password token not found or it has been expired", 400)
    );
  }

  // user password mustch1 match with confirmpassword.........
  if (req.body.password !== req.body.confirmpassword) {
    return next(new ErrorHandler("password redquired", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//.........getuserDetail's
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  // find user by id..
  const user = await User.findById(req.user.id);

  //send to res..
  res.status(200).json({
    success: true,
    user,
  });
});

//....user update passsword
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isMatchpassword = await bcrypt.compare(
    req.body.oldpassword,
    user.password
  );
  if (!isMatchpassword) {
    return next(new ErrorHandler("old password does'nt match", 404));
  }
  if (req.body.newpassword !== req.body.confirmpassword) {
    return next(
      new ErrorHandler("new password does'nt match with confim password"),
      404
    );
  }

  user.password = req.body.newpassword;
  sendToken(user, 200, res);
});

//......update profile
exports.updateProile = catchAsyncError(async (req, res, next) => {
  const userNewDetails = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, userNewDetails, {
    new: true,
    runValidators: true,
    userFindandModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// .......get all users
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// .......get all users by id ------- admin --------
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const users = await User.findById(req.params.id);
  if (!users) {
    return next(new ErrorHandler("users not found ", 400));
  }
  res.status(200).json({
    success: true,
    users,
  });
});

//......delete user by id in ------- admin --------
exports.delUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  await user.deleteOne();
  res.status(200).json({
    success: true,
    message: `Admin successfully delete ${user.name}`,
  });
});

//......update role by id in ------- admin --------
exports.updateRole = catchAsyncError(async (req, res, next) => {
  const userNewDetails = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, userNewDetails);
  await user.save();
  res.status(200).json({
    success: true,
    message: `admin successfully update Role ${req.body.name}`,
  });
});
