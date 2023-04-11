const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// user model .......
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Plz enter name"],
    minLength: [4, "length must be 4"],
    maxLength: [8, "length neither excced to 8"],
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
    minLength: [4, "length must be 4"],
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

// hash password before the save the user........
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// generater the auth token using jwt....
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.SecrectKey, {
    expiresIn: process.env.JwtExperies,
  });
};

// compare the user password with hash DB password....
userSchema.methods.compared = function (enteredpassword) {
  return bcrypt.compare(enteredpassword, this.password);
};
module.exports = mongoose.model("User", userSchema);
