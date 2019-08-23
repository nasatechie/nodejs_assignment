import express from "express";
import userController from "../../controllers/users-controller";

import { isAuthenticated } from "../../middlewares/jwtTokenVerifier";

const userRouter = express.Router();

// userRouter.use(isAuthenticated);

userRouter
  .get("/", (request, response) => {
    userController.getAllUsers(request, response);
  })
  .delete("/:id", (request, response) => {
    userController.deleteUser(request, response);
  });

export default userRouter;
