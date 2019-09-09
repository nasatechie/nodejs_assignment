import Product from "../models/products";
import { STATUS_MESSAGES } from "../consts/messages";

function getAllProducts(request, response) {
  Product.find().exec((err, products) => {
    if (err) {
      sendInternalServerError(response, { error: err.message });
    }
    response.json(products);
  });
}

function addProduct(request, response) {
  const newProduct = new Product(request.body);
  newProduct.save({ new: true }, (err, newProd) => {
    if (err) {
      sendInternalServerError(response, { error: err.message });
    }
    response.status(201).json(newProd);
  });
}

function deleteProduct(request, response) {
  Product.deleteOne({ _id: request.params.id }, (err, result) => {
    if (err) {
      sendInternalServerError(response, { error: err.message });
    }
    const { deletedCount } = result;
    if (deletedCount > 0) {
      response.json({ message: STATUS_MESSAGES.DELETED_SUCCESSFULLY });
    } else {
      response.json({ message: STATUS_MESSAGES.NO_RECORD_FOUND });
    }
  });
}

function getProductDetails(request, response) {
  Product.findById(request.params.id, (err, product) => {
    if (err) {
      sendInternalServerError(response, { error: err.message });
    }
    response.json(product);
  });
}

function getProductReviews(request, response) {
  Product.findById(request.params.id, (err, { reviews }) => {
    if (err) {
      sendInternalServerError(response, { error: err.message });
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
