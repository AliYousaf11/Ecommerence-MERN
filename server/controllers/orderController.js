const Order = require("../model/orderModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const Product = require("../model/productModel");

// add new Order
exports.AddNewOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    OrderItems,
    paymentInfo,
    ItemsPrice,
    TotalPrice,
    shippingPrice,
    TaXPrice,
  } = req.body;

  const order = await Order.create({
    user: req.user._id,
    paidAt: Date.now(),
    shippingInfo,
    OrderItems,
    paymentInfo,
    ItemsPrice,
    TotalPrice,
    shippingPrice,
    TaXPrice,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

// get single order details by ------- admin --------
exports.singleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order Not found ", 400));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get order details by ------- user --------
exports.myOrders = catchAsyncError(async (req, res, next) => {
  console.log(typeof req.user._id);
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    orders,
  });
});

// get all order by ---------- admin ---------
exports.getAllOrder = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalOrderPrice = 0;
  orders.forEach((order) => {
    totalOrderPrice += order.TotalPrice;
  });

  res.status(200).json({
    success: true,
    orders,
    totalOrderPrice,
  });
});

// update orders by ---------- admin ------------
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order Id not found", 400));
  }

  if (order.statusCode === "Delivered") {
    return next(new ErrorHandler("You have already dispatch this order", 400));
  }

  order.OrderItems.forEach(async (o) => {
    await updateStock(o.product, o.quantity);
  });

  if (req.body.status === "Delivered") {
    order.deleviredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(productId, quantity) {
  const product = await Product.findById(productId);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// delete order by ---------- admin ------------
exports.delOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order Id not found", 400));
  }
  await order.deleteOne();
  res.status(200).json({
    success: true,
  });
});
