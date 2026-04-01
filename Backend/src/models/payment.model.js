const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  currency: String,
  status: String,
  stripeSessionId: String,
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);