import express from "express";

import productDetailsController from "../../controllers/product-details-controller";
import productController from "../../controllers/product-controller";
import { isAuthenticated } from "../../middlewares/jwtTokenVerifier";

const productsRouter = express.Router();

productsRouter.use(isAuthenticated);

productsRouter.get("/", (request, response) => {
  productController.getAllProducts(request, response);
});

productsRouter.post("/", (request, response) => {
  productController.addProduct(request, response);
});

productsRouter.get("/:id", (request, response) => {
  productDetailsController.getProductDetails(request, response);
});

productsRouter.get("/:id/reviews", (request, response) => {
  productDetailsController.getProductReviews(request, response);
});

export default productsRouter;
