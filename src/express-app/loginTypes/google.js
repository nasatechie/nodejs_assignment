import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import * as config from "../configuration";

export const googleStrategy = () => {
    return new GoogleStrategy(
        {
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackUrl
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile, {
                code: 200,
                message: "Google Authentication Successful",
                data: profile,
                token: refreshToken
            });
        }
    );
};