const express = require("express");
const ProductRouter = express.Router();

// IMPORT CONTROLLERS
const {
    upload,
  getProduct,
  postProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../Controllers/ProductController");
// DEFINE ROUTES
ProductRouter.get("/products", getProduct);
ProductRouter.post("/products", upload, postProduct);
ProductRouter.get("/products/:id", getSingleProduct);
ProductRouter.patch("/products/:id",upload, updateProduct);
ProductRouter.delete("/products/:id", deleteProduct);

module.exports = ProductRouter;
