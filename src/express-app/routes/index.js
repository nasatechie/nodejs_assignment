import express from "express";
import productRouter from "./products";
import userRouter from "./users";
import authRouter from "./auth";

const router = express.Router();

router.get("/", (request, response) => {
  response.redirect("/api/products");
});

router.use("/api/products", productRouter);
router.use("/api/users", userRouter);
router.use("/api/auth", authRouter);

export default router;