import jwt from "jsonwebtoken";
import "dotenv/config";

declare module "jsonwebtoken" {
    interface JwtPayload {
        userId: string;
    }
}

export function checkToken(token: string): Result<jwt.JwtPayload, Error> {
    if (!token) return [null, new ReferenceError("Missing token")];

    try {
        const isValid = jwt.verify(token, process.env.JWT_KEY || "");

        if (typeof isValid === "string") {
            throw new TypeError("Invalid token type");
        }

        return [isValid, null];
    } catch (err) {
        return [null, err as Error];
    }
}

export function createToken(userId: string) {
    const tokenDuration = 60 * 60;

    const token = jwt.sign({ userId }, process.env.JWT_KEY || "randomkey", {
        expiresIn: tokenDuration,
    });

    return token;
}
