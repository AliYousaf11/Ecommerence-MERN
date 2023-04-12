const express = require("express");
const router = express.Router();
const {
  userRegister,
  userLogin,
  logout,
  forgetpassword,
} = require("../controllers/userController");

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgetpassword);
module.exports = router;
