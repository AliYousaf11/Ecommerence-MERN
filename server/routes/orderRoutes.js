const express = require("express");
const router = express.Router();
const {
  AddNewOrder,
  singleOrder,
  myOrders,
  getAllOrder,
  updateOrder,
  delOrder,
} = require("../controllers/orderController.js");
const { isAuthUser, checkUserRoles } = require("../middleware/auth");

// order routes......
router.route("/order/new").post(isAuthUser, AddNewOrder);
router.route("/order/:id").get(isAuthUser, singleOrder);
router.route("/order/me").get(isAuthUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthUser, checkUserRoles("admin"), getAllOrder);

router
  .route("/admin/order/:id")
  .put(isAuthUser, checkUserRoles("admin"), updateOrder);

router
  .route("/admin/order/:id")
  .delete(isAuthUser, checkUserRoles("admin"), delOrder);

module.exports = router;
