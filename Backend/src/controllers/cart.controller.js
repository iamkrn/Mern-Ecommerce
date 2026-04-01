const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

// ➕ ADD TO CART
exports.addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID missing" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        products: [],
      });
    }

    const index = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (index > -1) {
      cart.products[index].quantity += 1;
    } else {
      cart.products.push({
        productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    console.log("ADD ERROR", err);
    res.status(500).json({ error: err.message });
  }
};

// 📥 GET CART
exports.getCart = async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(200).json({ products: [] });
    }

    res.status(200).json(cart);
  } catch (err) {
    console.log("GET ERROR", err);
    res.status(500).json({ error: err.message });
  }
};

// ➕ INCREASE
exports.increaseQty = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.body;

  const cart = await Cart.findOne({ userId });

  const item = cart.products.find(
    (p) => p.productId.toString() === productId
  );

  if (item) item.quantity += 1;

  await cart.save();
  res.json(cart);
};

// ➖ DECREASE
exports.decreaseQty = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.body;

  const cart = await Cart.findOne({ userId });

  const item = cart.products.find(
    (p) => p.productId.toString() === productId
  );

  if (item && item.quantity > 1) {
    item.quantity -= 1;
  }

  await cart.save();
  res.json(cart);
};

// ❌ REMOVE
exports.removeItem = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.body;

  const cart = await Cart.findOne({ userId });

  cart.products = cart.products.filter(
    (p) => p.productId.toString() !== productId
  );

  await cart.save();
  res.json(cart);
};