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

// create reviews and rating....
exports.createReviews = catchAsyncError(async (req, res, next) => {
  const { rating, comments, productId } = req.body;

  // .......user review on product id.....
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comments,
  };

  // find product either avail or not?
  const product = await Product.findById(productId);

  // if same user give review again....
  const isReviewd = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewd) {
    // for every review's check review.user._id  === login user id
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comments = comments);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  // calculate the all ratings values.....
  let average = 0;
  product.reviews.forEach((rev) => {
    average += rev.rating;
  });

  // calculate the all ratings average.....
  product.ratings = average / product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});
