import { Request, Response } from "express";
import products from "../models/products";
import reviews from "../models/reviews";

/**
 * Function which the returns details of a specific product.
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns: Details of the product whose Id matches with the given Id. An empty object is returned if no product is found
 *
 * @returns: **Product Id is missing** in case if product id was not found as a route parameter
 *
 */
function getProductDetails(request, response) {
  response.header("Content-Type", "application/json");
  const productId = Number(request.params.id);
  if (!productId) response.send("Product Id is missing");
  let searchedProduct = products.find(product => product.id === productId);
  if (!searchedProduct)
    searchedProduct = {
      status: 404,
      message: `No product found with product id ${productId}`
    };
  response.send(JSON.stringify(searchedProduct, null, 4));
}

/**
 * Function which the returns reviews for a specific product.
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns: List of the all the reviews associated to a specific product
 *
 * @returns: **Product Id is missing** in case if product id was not found as a route parameter
 *
 */
function getProductReviews(request, response) {
  response.header("Content-Type", "application/json");
  const productId = Number(request.params.id);
  if (!productId) response.send("Product Id is missing");
  const searchedReviews = reviews.filter(
    review => review.productId === productId
  );
  response.send(JSON.stringify({ reviews: searchedReviews }, null, 4));
}

export default { getProductDetails, getProductReviews };
