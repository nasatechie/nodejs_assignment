import express from "express";
import passport from "passport";
import * as auth from "../../controllers/auth";

const authRouter = express.Router();

authRouter.route("/").post(auth.authByLogin);

authRouter.route("/login").post(passport.authenticate("local"), (req, res) => {
    return res.json({
        code: 200,
        message: "OK",
        username: req.user.username
    });
});

authRouter.route("/facebook").get(passport.authenticate("facebook"));
authRouter.route("/facebook/callback").get(auth.authByPassport("facebook"));

authRouter.route("/twitter").get(passport.authenticate("twitter"));
authRouter.route("/twitter/callback").get(auth.authByPassport("twitter"));

authRouter.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile"]
    })
);
authRouter.get("/google/callback", auth.authByPassport("google"));

export default authRouter;