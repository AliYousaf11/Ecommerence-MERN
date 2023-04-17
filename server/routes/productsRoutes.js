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

router.route("/products").get(getAllproducts);
router.route("/product/:id").get(getbyIdProduct);

// admin routes.....
router
  .route("/admin/product/new")
  .post(isAuthUser, checkUserRoles("admin"), createdproduct);
router
  .route("/admin/product/:id")
  .put(isAuthUser, checkUserRoles("admin"), updateProduct);
router
  .route("/admin/product/:id")
  .delete(isAuthUser, checkUserRoles("admin"), deleteProduct);

module.exports = router;
