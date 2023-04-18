const express = require("express");
const router = express.Router();
const { AddNewOrder } = require("../controllers/orderController.js");
const { isAuthUser } = require("../middleware/auth");

// order routes......
router.route("/order/new").post(isAuthUser, AddNewOrder);
module.exports = router;
