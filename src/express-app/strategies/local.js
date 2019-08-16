import { Strategy as LocalStrategy } from "passport-local";
import * as config from "../config";

export const localStrategy = () => {
  return new LocalStrategy((userName, password, cb) => {
    console.log(userName, password);
    const { username: configUserName, password: configPassword } = config.user;
    if (userName !== configUserName || password !== configPassword)
      return cb(null, false);
    else return cb(null, config.user);
  });
};
