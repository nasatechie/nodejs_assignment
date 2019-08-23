import express from "express";
import productRouter from "./products";
import userRouter from "./users";
import authRouter from "./auth";
import citiesRouter from "./cities";

const router = express.Router();

router.get("/", (request, response) => {
  response.redirect("/api/products");
});

router.use("/api/auth", authRouter);
router.use("/api/products", productRouter);
router.use("/api/users", userRouter);
router.use("/api/cities", citiesRouter);

export default router;
