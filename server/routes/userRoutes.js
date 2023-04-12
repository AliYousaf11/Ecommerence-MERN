const express = require("express");
const router = express.Router();
const {
  userRegister,
  userLogin,
  logout,
} = require("../controllers/userController");

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/logout").get(logout);
module.exports = router;
