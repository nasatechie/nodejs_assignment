import * as jwt from "jsonwebtoken";
import * as config from "../config";
import strategies from "../strategies";
import passport from "passport";

strategies(passport);

export const authByLogin = (req, res) => {
  const {
    username: configUserName,
    password: configPassword,
    name: configName
  } = config.user;
  const secret = config.secret;
  const { username, password } = req.body;

  if (username === configUserName && password === configPassword) {
    const token = jwt.sign(config.user, secret);
    return res.json({
      code: 200,
      message: "OK",
      data: {
        user: {
          username: configUserName,
          name: configName
        }
      },
      token: token
    });
  } else {
    return res.json({
      code: 404,
      message: "Not Found"
    });
  }
};

export const authByPassport = type => (req, res) => {
  res.header("Content-Type", "application/json");
  passport.authenticate(type, (err, user, info) => {
    if (err) {
      return res.send(err);
    }
    return res.send(JSON.stringify(info, null, 4));
  })(req, res);
};
