import express from "express";
import productController from "../controllers";
import productDetailsController from "../controllers/product-details-controller";
import userController from "../controllers/users-controller";

const router = express.Router();

router.get("/", (request, response) => {
  response.redirect("/api/products");
});

router.get("/api/products", (request, response) => {
  productController.getAllProducts(request, response);
});

router.post("/api/products", (request, response) => {
  productController.addProduct(request, response);
});

router.get("/api/products/:id", (request, response) => {
  productDetailsController.getProductDetails(request, response);
});

router.get("/api/products/:id/reviews", (request, response) => {
  productDetailsController.getProductReviews(request, response);
});

router.get("/api/users", (request, response) => {
  userController.getAllUsers(request, response);
});

export default router;
