import * as config from "../configuration";
import * as jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
    try {
        const { token } = req.headers;
        const { username: Username, password: Password } = config.user;
        const { secret } = config;

        if (!token)
            return res.json({
                code: 401,
                message: "Not authorized",
                data: "token not passed"
            });

        return jwt.verify(token, secret, (err, authData) => {
            if (err) {
                res.json({
                    code: 401,
                    message: "Not authorized",
                    data: "Incorrect token"
                });
            } else {
                const { username, password } = authData;
                if (username !== Username || password !== Password)
                    return res.json({
                        code: 401,
                        message: "Not authorized",
                        data: "Username/password incorrect"
                    });

                return next();
            }
        });
    } catch (err) {
        return res.json(err);
    }
};