const express = require("express");
const cartRouter = express.Router();

const {
  getCart,
  addToCart,
  updateCart,
  deleteFromCart,
  clearCart,
} = require("../Controllers/CartController");

// Define cart routes
cartRouter.get("/cart/:id", getCart);
cartRouter.post("/cart", addToCart);
cartRouter.patch("/cart/:id", updateCart);
cartRouter.delete("/cart/:userId/:productId", deleteFromCart);
cartRouter.delete("/cart/clear/:userId", clearCart);

module.exports = cartRouter;
