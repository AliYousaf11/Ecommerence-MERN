const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
  },

  OrderItems: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
      Image: {
        type: String,
        required: true,
      },
    },
  ],

  paymentInfo: {
    id: { type: Number, required: true },
    status: { type: String, required: true },
  },

  ItemsPrice: {
    type: Number,
    required: true,
    default: 0,
  },

  TotalPrice: {
    type: Number,
    required: true,
    default: 0,
  },

  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },

  TaXPrice: {
    type: Number,
    required: true,
    default: 0,
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  paidAt: {
    type: Date,
    required: true,
  },

  deleviredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },

  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
});

module.exports = mongoose.model("Order", orderSchema);
