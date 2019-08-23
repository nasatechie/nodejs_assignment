import Product from "../models/products";

function getAllProducts(request, response) {
  response.header("Content-Type", "application/json");
  Product.find().exec((err, products) => {
    if (err) {
      response.status(400).json({ error: err.message });
    }
    response.json(products);
  });
}

function addProduct(request, response) {
  response.header("Content-Type", "application/json");
  const newProduct = new Product(request.body);
  newProduct.save({ new: true }, (err, newProd) => {
    if (err) {
      response.status(400).json({ error: err.message });
    }
    response.status(201).json(newProd);
  });
}

function deleteProduct(request, response) {
  Product.deleteOne({ _id: request.params.id }, (err, result) => {
    if (err) {
      response.status(400).json({ error: err.message });
    }
    const { deletedCount } = result;
    if (deletedCount > 0) {
      response.json({ message: "Deleted Successfully" });
    } else {
      response.json({ message: "No record found!" });
    }
  });
}

function getProductDetails(request, response) {
  response.header("Content-Type", "application/json");
  Product.findById(request.params.id, (err, product) => {
    if (err) {
      response.status(400).json({ error: err.message });
    }
    response.json(product);
  });
}

function getProductReviews(request, response) {
  response.header("Content-Type", "application/json");
  Product.findById(request.params.id, (err, { reviews }) => {
    if (err) {
      response.status(400).json({ error: err.message });
    }
    response.json(reviews);
  });
}

export default {
  getAllProducts,
  addProduct,
  deleteProduct,
  getProductDetails,
  getProductReviews
};
