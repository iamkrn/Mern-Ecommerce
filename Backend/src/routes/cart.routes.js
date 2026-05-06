const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cart.controller");
const authMiddleware = require("../middlewares/auth.middleware");

//  CART ROUTES (ALL PROTECTED)

//  ADD TO CART
router.post("/add", authMiddleware, cartController.addToCart);

//  GET USER CART
router.get("/", authMiddleware, cartController.getCart);

// INCREASE QUANTITY
router.post("/increase", authMiddleware, cartController.increaseQty);

//  DECREASE QUANTITY
router.post("/decrease", authMiddleware, cartController.decreaseQty);

// REMOVE ITEM
router.post("/remove", authMiddleware, cartController.removeItem);

//delete
router.delete("/clear", authMiddleware, cartController.clearCart);


module.exports = router;