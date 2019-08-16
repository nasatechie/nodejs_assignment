import { facebookStrategy } from "./facebook";
import { localStrategy } from "./local";
import { twitterStrategy } from "./twitter";
import { googleStrategy } from "./google";

export default function(passport) {
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
  passport.use("local", localStrategy());
  passport.use("facebook", facebookStrategy());
  passport.use("twitter", twitterStrategy());
  passport.use("google", googleStrategy());
}
