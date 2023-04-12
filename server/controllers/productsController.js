const Product = require("../model/productModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeature = require("../utils/apifeature");

// create new products --- Admin -----
exports.createdproduct = catchAsyncError(async (req, res) => {
  req.body.user = req.body.id;
  const product = await Product.create(req.body);
  if (!product) {
    return next(new ErrorHandler("product not added ", 404));
  }
  res.status(200).send({
    success: true,
    product,
    message: "new product added...",
  });
});

// get all products ------
exports.getAllproducts = catchAsyncError(async (req, res) => {
  const prodductCount = await Product.countDocuments();
  const apiFeature = new ApiFeature(Product.find(), req.query)
    .search()
    .filter()
    .pagination(2);
  const product = await apiFeature.query;

  res.status(200).send({
    success: true,
    product,
    prodductCount,
    message: "get all products...",
  });
});

// update product by id-------
exports.updateProduct = catchAsyncError(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found ", 404));
  }
  const updateproduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.status(200).send({
    success: true,
    updateproduct,
    message: "update product successfully...",
  });
});

// delete product by id-------
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found ", 404));
  }
  await product.deleteOne();
  res.status(200).send({
    success: true,
    message: "delete product successfully...",
  });
});

// products get by id .....
exports.getbyIdProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found ", 404));
  }
  res.status(200).send({
    success: true,
    product,
  });
});
