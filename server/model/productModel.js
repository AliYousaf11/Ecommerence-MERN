const mongoose = require("mongoose");

const productModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Plz enter name"],
  },
  price: {
    type: Number,
    required: [true, "Plz enter price"],
    maxLength: [4, "price can't more than 4 digit's"],
  },
  description: {
    type: String,
    required: [true, "Plz enter description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: { type: String, required: [true, "Plz select category"] },
  stock: {
    type: Number,
    required: [true, "Plz enter stack"],
    maxLength: [4, "stock can't more than 4 digit's"],
    default: 1,
  },
  numOfReviews: {
    type: String,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comments: { type: String, required: true },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productModel);

// user: {
//   type: mongoose.Schema.ObjectId,
//   ref: "User",
// },
