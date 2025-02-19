const mongoose = require("mongoose");
const validator = require("validator");

const ProductSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      validate: {
        validator: (value) => /^[a-zA-Z\s]+$/.test(value),
        message: "Only Alphabets are allowed",
      },
    },
    description: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (value) => validator.isLength(value, { min: 5 }),
        message: "Description must be at least 5 characters long",
      },
    },
    price: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => value > 0,
        message: "Price must be greater than 0",
      },
    },
    category: {
      type: String,
      required: true,
      enum: ["Laptop", "Mobile", "Headphones", "Watch", "Tablet"],
    },
    image: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (value) => /\.(jpg|jpeg|png|gif|webp)$/i.test(value),
        message: "Invalid image format",
      },
    },
    stock: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => value > 10,
        message: "Stock must be greater than 10",
      },
    },
    ratings: {
      type: Number,
      default: 0,
      validate: {
        validator: (value) => value >= 0 && value <= 5,
        message: "Ratings must be between 0 and 5",
      },
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Register",
        },
        rating: {
          type: Number,
          required: true,
          validate: {
            validator: (value) => value >= 0 && value <= 5,
            message: "Rating must be between 0 and 5",
          },
        },
        comments: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
