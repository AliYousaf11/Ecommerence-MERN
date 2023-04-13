const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// user model .......
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Plz enter name"],
    minLength: [4, "length must be 4"],
    maxLength: [30, "length neither excced to 18"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Plz enter email"],
    validate: [validator.isEmail, "Plz enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Plz enter password"],
    minLength: [6, "length must be 6"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

// // hash password before the save the user........
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   this.password = await bcrypt.hash(this.password, 10);
// });

// generater the auth token using jwt....
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.SecrectKey, {
    expiresIn: process.env.JwtExperies,
  });
};

// reset the user passowrd
userSchema.methods.getresetPassword = function () {
  // 1- generate the reset token
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
  return resetToken;
};
module.exports = mongoose.model("User", userSchema);
