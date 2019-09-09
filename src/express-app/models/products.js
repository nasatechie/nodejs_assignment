import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: String,
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  reviews: Array
});

const Product = mongoose.model("Products", productSchema);
module.exports = Product;
