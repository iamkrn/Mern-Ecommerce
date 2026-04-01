const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/payment.model");

// ✅ CREATE CHECKOUT
exports.createCheckoutSession = async (req, res) => {
  try {
    const { products } = req.body;

    console.log("PRODUCTS:", products); // 👈 DEBUG

    if (!products || products.length === 0) {
      return res.status(400).json({ error: "No products provided" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: products.map(item => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ url: session.url });

  } catch (error) {
    console.log("❌ STRIPE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};


// ✅ WEBHOOK (FINAL)
exports.webhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("❌ Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("🔥 EVENT:", event.type);

  // ✅ ONLY SUCCESS CASE
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      await Payment.create({
        userId: session.metadata.userId, // 🔥 dynamic user
        amount: session.amount_total / 100,
        currency: session.currency,
        status: session.payment_status,
        stripeSessionId: session.id,
      });

      console.log("✅ Payment saved in DB");
    } catch (error) {
      console.log("❌ DB ERROR:", error);
    }
  }

  res.status(200).json({ received: true });
};