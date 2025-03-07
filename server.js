//PACKAGES

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//MIDDLEWARE

app.use(cors());
app.use(express.json());

//MGONGOOSE CONNECT

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

//APP ROUTES
const registerRouter = require("./View/RegisterView");
const ProductRouter = require("./View/ProductView");
const cartRouter = require("./View/CartView");

app.use("/", registerRouter);
app.use("/", ProductRouter);
app.use("/", cartRouter);

//PORT DETAILS

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
