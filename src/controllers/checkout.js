import express from "express";
import Stripe from "stripe";

export const checkoutRouter = express.Router();

checkoutRouter.get("/", async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "mxn",
            unit_amount: 1000,
            product_data: { name: "Producto prueba" },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
    });

    res.json({ checkout_url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
