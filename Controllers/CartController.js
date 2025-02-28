// IMPORT CART SCHEMA
const Cart = require("../Models/CartSchema");
const Product = require("../Models/ProductSchema");

// GET CART
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.id }).populate(
      "items.product"
    );
    if (!cart) {
      return res.status(404).json({
        status: "fail",
        message: "No Cart Available",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Cart Fetched Successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error Fetching Cart",
      error: error.message,
    });
  }
};

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({
        status: "fail",
        message: "Product Not Found",
      });
    }

    const itemIndex = cart.items.findIndex((item) =>
      item.product.equals(productId)
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(201).json({
      status: "success",
      message: "Product Added To Cart Successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error Adding Product To Cart",
      error: error.message,
    });
  }
};

// UPDATE CART ITEM
const updateCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        status: "fail",
        message: "Cart Not Found",
      });
    }

    const item = cart.items.find((item) => item.product.equals(productId));
    if (!item) {
      return res.status(404).json({
        status: "fail",
        message: "Item Not Found in Cart",
      });
    }
    item.quantity = quantity;
    await cart.save();
    res.status(200).json({
      status: "success",
      message: "Cart Updated Successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error Updating Cart",
      error: error.message,
    });
  }
};

// REMOVE FROM CART
const deleteFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        status: "fail",
        message: "Cart Not Found",
      });
    }

    cart.items = cart.items.filter((item) => !item.product.equals(productId));
    await cart.save();
    res.status(200).json({
      status: "success",
      message: "Item Deleted Successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error Deleting Item",
      error: error.message,
    });
  }
};

// CLEAR CART
const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        status: "fail",
        message: "Cart Not Found",
      });
    }

    cart.items = [];
    await cart.save();
    res.status(200).json({
      status: "success",
      message: "Cart Cleared Successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error Clearing Cart",
      error: error.message,
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCart,
  deleteFromCart,
  clearCart,
};
