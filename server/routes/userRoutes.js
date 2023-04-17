const express = require("express");
const router = express.Router();
const {
  userRegister,
  userLogin,
  logout,
  forgetpassword,
  resetuserPassword,
  getUserDetails,
  updatePassword,
  updateProile,
} = require("../controllers/userController");
const { isAuthUser } = require("../middleware/auth");

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgetpassword);
router.route("/password/reset/:token").put(resetuserPassword);
router.route("/me").get(isAuthUser, getUserDetails);
router.route("/password/update").put(isAuthUser, updatePassword);
router.route("/me/update").put(isAuthUser, updateProile);
module.exports = router;
