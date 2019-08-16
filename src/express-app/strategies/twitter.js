import { Strategy as TwitterStrategy } from "passport-twitter";
import * as config from "../config";

export const twitterStrategy = () => {
  return new TwitterStrategy(
    {
      consumerKey: config.twitter.consumerKey,
      consumerSecret: config.twitter.consumerSecret,
      callbackURL: config.twitter.callbackUrl
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile, {
        code: 200,
        message: "Twitter Authentication Successful",
        data: profile,
        token: refreshToken
      });
    }
  );
};
