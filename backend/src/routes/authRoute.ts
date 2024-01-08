import { createUser, showUser } from "@/controllers/userController";
import { Request, Response, Router } from "express";
import multer from "multer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const authRoute = Router();

authRoute.post("/register", multer().none(), (req: Request, res: Response) =>
    createUser(req.body?.username, req.body?.password)
        .then(() => res.status(302).redirect("/login"))
        .catch((err) =>
            res.status(400).json({
                success: false,
                message: err?.message,
            })
        )
);

authRoute.post(
    "/login",
    multer().none(),
    async (req: Request, res: Response) => {
        if (!req.body?.password) {
            return res.status(300).json({
                success: false,
                message: "Invalid Body",
            });
        }


        let user;

        try {
            user = await showUser(req.body?.username);
        } catch (err: any) {
            return res.status(300).json({
                success: false,
                message: err?.message,
            });
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (validPassword === false) {
            return res.status(300).json({
                success: false,
                message: "Invalid password",
            });
        }

        const tokenDuration = 60 * 5;

        const token = jwt.sign(
            {
				userId: user._id,
                username: user.username,
            },
            process.env.JWT_KEY || "randomkey",
            {
                expiresIn: tokenDuration,
            }
        );

        res.status(204)
            .cookie("access_token", token, {
                maxAge: tokenDuration,
				secure: process.env.NODE_ENV === 'prod',
				httpOnly: true,
            })
            .json({ success: true });
    }
);

export default authRoute;
