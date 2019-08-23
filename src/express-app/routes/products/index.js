import express from "express";

import productController from "../../controllers/product-controller";
import { isAuthenticated } from "../../middlewares/jwtTokenVerifier";

const productsRouter = express.Router();

// productsRouter.use(isAuthenticated);

productsRouter.get("/", (request, response) => {
  productController.getAllProducts(request, response);
});

productsRouter.post("/", (request, response) => {
  productController.addProduct(request, response);
});

productsRouter.get("/:id", (request, response) => {
  productController.getProductDetails(request, response);
});

productsRouter.get("/:id/reviews", (request, response) => {
  productController.getProductReviews(request, response);
});

productsRouter.delete("/:id", (request, response) => {
  productController.deleteProduct(request, response);
});

export default productsRouter;
