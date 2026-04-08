const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  status: {
    type: String,
    enum: ["pending", "paid", "shipped", "delivered"],
    default: "pending"
    
  },

  paymentStatus: {
    type: String,
    enum: ["unpaid", "paid"],
    default: "unpaid"
  },

  paymentIntentId: String, // Stripe se aayega

  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: Number,
      price: Number
    }
  ],

  totalPrice: Number

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);