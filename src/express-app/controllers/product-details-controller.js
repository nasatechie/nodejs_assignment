import { productModel } from "../../database/db-props";

function getProductDetails(request, response) {
  response.header("Content-Type", "application/json");
  const { id } = request.params;
  productModel
    .findOne({ where: { id } })
    .then(data => response.json(data || {}));
}

function getProductReviews(request, response) {
  response.header("Content-Type", "application/json");
  const { id } = request.params;
  productModel
    .findOne({ where: { id } })
    .then(({ reviews }) => response.send(reviews));
}

export default { getProductDetails, getProductReviews };
