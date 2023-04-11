const express = require("express");
const router = express.Router();
const {
  getAllproducts,
  createdproduct,
  updateProduct,
  deleteProduct,
  getbyIdProduct,
} = require("../controllers/productsController");

router.route("/products").get(getAllproducts);
router.route("/product/new").post(createdproduct);
router.route("/product/:id").put(updateProduct);
router.route("/product/:id").delete(deleteProduct);
router.route("/product/:id").get(getbyIdProduct);
module.exports = router;
