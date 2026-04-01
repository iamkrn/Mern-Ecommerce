const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const upload = require("../middlewares/multer.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const cartController = require("../controllers/cart.controller");

router.post("/register", upload.single("profileImage"), authController.registerUser);
router.put("/update", authMiddleware, authController.updateUser);
router.post("/login", authController.loginUser);
router.post("/add-to-cart", authMiddleware, cartController.addToCart);
router.get("/get-cart", authMiddleware, cartController.getCart);

module.exports = router;
