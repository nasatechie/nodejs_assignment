import { Request, Response } from "express";
import products from "../models/products";

/**
 * Function which returns the list of all the available products
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns: List of the all the available products
 */
function getAllProducts(request, response) {
  console.log(response);
  response.header("Content-Type", "application/json");
  response.send(JSON.stringify({ products }, null, 4));
}

/**
 * Function which adds a new product
 *
 * @param {Request} request
 * @param {Response} response
 */
function addProduct(request, response) {
  response.header("Content-Type", "application/json");
  products.push(request.body);
  response.send(request.body);
}

export default { getAllProducts, addProduct };
