const express = require("express");

const {
  getAllproducts,
  createdproduct,
  updateProduct,
  deleteProduct,
  getbyIdProduct,
} = require("../controllers/productsController");
const router = express.Router();
const { isAuthUser, checkUserRoles } = require("../middleware/auth");

// get all prpducts........
router.route("/products").get(getAllproducts);

// get by id..............
router.route("/product/:id").get(getbyIdProduct);

// post new product........
router
  .route("/product/new")
  .post(isAuthUser, checkUserRoles("admin"), createdproduct);

// update by id............
router
  .route("/product/:id")
  .put(isAuthUser, checkUserRoles("admin"), updateProduct);

// delete by id...........
router
  .route("/product/:id")
  .delete(isAuthUser, checkUserRoles("admin"), deleteProduct);

module.exports = router;
