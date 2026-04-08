const express = require("express");
const router = express.Router();


const {
  getUserStats,
  getSalesStats,
  getProductStats,
  getDashboardSummary
} = require("../controllers/admin.controller");

router.get("/stats/users", getUserStats);
router.get("/stats/sales", getSalesStats);
router.get("/stats/products", getProductStats);
router.get("/stats/dashboard", getDashboardSummary);
// routes/admin.js




module.exports = router;