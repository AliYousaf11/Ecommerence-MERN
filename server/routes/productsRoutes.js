const express = require("express");
const {
  getAllproducts,
  createdproduct,
  updateProduct,
  deleteProduct,
  getbyIdProduct,
} = require("../controllers/productsController");
const router = express.Router();
const { isAuthUser } = require("../middleware/auth");

router.route("/products").get(getAllproducts);

router.route("/product/new").post(isAuthUser, createdproduct);
router.route("/product/:id").put(isAuthUser, updateProduct);
router.route("/product/:id").delete(isAuthUser, deleteProduct);
router.route("/product/:id").get(getbyIdProduct);
module.exports = router;
