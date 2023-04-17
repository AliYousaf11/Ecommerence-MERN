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
  getSingleUser,
  getAllUsers,
  updateRole,
  delUser,
  createReviews,
} = require("../controllers/userController");
const { isAuthUser, checkUserRoles } = require("../middleware/auth");

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgetpassword);
router.route("/password/reset/:token").put(resetuserPassword);
router.route("/me").get(isAuthUser, getUserDetails);
router.route("/password/update").put(isAuthUser, updatePassword);
router.route("/me/update").put(isAuthUser, updateProile);

// admin-----
router
  .route("/admin/users")
  .get(isAuthUser, checkUserRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthUser, checkUserRoles("admin"), getSingleUser);

router
  .route("/admin/user/:id")
  .put(isAuthUser, checkUserRoles("admin"), updateRole);

router
  .route("/admin/user/:id")
  .delete(isAuthUser, checkUserRoles("admin"), delUser);

module.exports = router;
