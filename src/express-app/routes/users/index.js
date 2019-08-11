import express from "express";
import userController from "../../controllers/users-controller";
import { isAuthenticated } from "../../middlewares/jwtVerifier";

const userRouter = express.Router();

userRouter.use(isAuthenticated);

userRouter.get("/", (request, response) => {
    userController.getAllUsers(request, response);
});

export default userRouter;