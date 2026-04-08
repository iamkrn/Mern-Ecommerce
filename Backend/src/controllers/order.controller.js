const mongoose = require("mongoose");  // ✅ Fix 1
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");

exports.createOrder = async (req, res) => {
  try {
    const { user, products } = req.body;

    if (!user || !products || products.length === 0) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const totalPrice = products.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    const order = new Order({
      user: new mongoose.Types.ObjectId(req.body.user),  // ✅ Fix 2
      products,
      totalPrice,
      status: "paid"
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {                                                   // ✅ Fix 3
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.createOrderAfterPayment = async (req, res) => {
  try {
    const { products, totalPrice, paymentIntentId } = req.body;

    const order = new Order({
      user: req.user._id,
      products,
      totalPrice,
      status: "paid",
      paymentStatus: "paid",
      paymentIntentId
    });

    const saved = await order.save();
    res.status(201).json(saved);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};