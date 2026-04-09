const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const blogRoutes = require("./routes/blog.routes");
const countDownRoutes = require("./routes/countDown.routes");
const cartRoutes = require("./routes/cart.routes");
const paymentRoutes = require("./routes/payment.routes");
const contactRoutes = require("./routes/contact.routes")
const adminRoutes = require("./routes/admin.routes")

const app = express();


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

// ❗ 2. WEBHOOK ONLY (RAW BODY)
app.post(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }),
  require("./controllers/payment.controller").webhook
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const path = require("path");
app.use("/uploads", express.static("public/uploads"));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));


app.use("/api/payment", paymentRoutes); 
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api", countDownRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/contact",contactRoutes)
app.use("/api/admin",adminRoutes);
app.use("/api/orders", require("./routes/order.routes"));

module.exports = app;