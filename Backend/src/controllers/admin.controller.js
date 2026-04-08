const User = require("../models/user.model");
const Order = require("../models/order.model");
const Product = require("../models/product.model");

// ================= USERS =================
exports.getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const monthlyGrowth = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          users: { $sum: 1 }
        }
      },
      {
        $project: {
          month: "$_id",
          users: 1,
          _id: 0
        }
      },
      { $sort: { month: 1 } }
    ]);

    res.json({
      totalUsers,
      monthlyGrowth
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


// ================= SALES =================
exports.getSalesStats = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalSales: { $sum: 1 },
          totalRevenue: {
            $sum: {
              $ifNull: ["$totalPrice", 0]  
            }
          }
        }
      },
      {
        $project: {
          month: "$_id",
          totalSales: 1,
          totalRevenue: 1,
          _id: 0
        }
      },
      { $sort: { month: 1 } }
    ]);

    res.json(stats);

  } catch (err) {
    console.log("🔥 SALES ERROR:", err); // IMPORTANT
    res.status(500).json({ message: err.message });
  }
};


exports.getProductStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    res.json({ totalProducts });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// ================= DASHBOARD SUMMARY =================
exports.getDashboardSummary = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const revenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" }
        }
      }
    ]);

    const latestOrders = await Order.find()
  .populate("user", "name email")
  .sort({ createdAt: -1 })
  .limit(5);
  
    const topProducts = await Order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.product",
          totalSold: { $sum: "$products.quantity" }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue: revenue[0]?.totalRevenue || 0,
      latestOrders,
      topProducts
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};