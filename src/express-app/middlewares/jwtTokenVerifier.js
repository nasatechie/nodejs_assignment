import * as config from "../config";
import * as jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  try {
    const { token } = req.headers;
    const { email: configEmail, password: configPassword } = config.user;
    const { secret } = config;

    if (!token)
      return res.json({
        code: 401,
        message: "Unauthorized",
        data: "No token passed"
      });

    return jwt.verify(token, secret, (err, authData) => {
      if (err) {
        res.json({
          code: 401,
          message: "Unauthorized",
          data: "Incorrect token"
        });
      } else {
        console.log(authData);
        const { email, password } = authData;
        if (email !== configEmail || password !== configPassword)
          return res.json({
            code: 401,
            message: "Unauthorized",
            data: "Username/password might be incorrect"
          });

        return next();
      }
    });
  } catch (err) {
    return res.json(err);
  }
};
