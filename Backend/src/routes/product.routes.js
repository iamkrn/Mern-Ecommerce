const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");
const upload = require("../middlewares/multer.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

// 🛒 PRODUCT ROUTES

// ➕ CREATE PRODUCT (LOGIN REQUIRED)
router.post(
  "/",
  authMiddleware, // ✅ ADD THIS (important)
  upload.single("image"),
  productController.createProduct
);

// 📥 GET ALL PRODUCTS (PUBLIC)
router.get("/", productController.getAllProducts);

// 🔍 GET SINGLE PRODUCT (PUBLIC)
router.get("/:id", productController.getProductById);

// ✏️ UPDATE PRODUCT (LOGIN REQUIRED)
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  productController.updateProduct
);

// ❌ DELETE PRODUCT (LOGIN REQUIRED)
router.delete(
  "/:id",
  authMiddleware,
  productController.deleteProduct
);

module.exports = router;