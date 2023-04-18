const Order = require("../model/orderModel");
const catchAsyncError = require("../middleware/catchAsyncError");

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
