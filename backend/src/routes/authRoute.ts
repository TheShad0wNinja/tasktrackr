import { createUser, showUser } from "@/controllers/userController";
import { Request, Response, Router } from "express";
import multer from "multer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { checkToken, createToken } from "@/util/jwt";

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

        const token = createToken(user._id.toString());

        res.status(200)
            .cookie("access_token", token, {
                httpOnly: false,
                secure: process.env.NODE_ENV === "prod",
            })
            .json({
                success: true,
                data: { token, username: user.username, userId: user.id },
            });
    }
);

authRoute.get("/me", multer().none(), (req: Request, res: Response) => {
    const [token, err] = checkToken(req.cookies?.access_token);

    if (err !== null) {
        return res.status(400).json({
            success: false,
            message: "Invalid authentication",
        });
    }

    res.status(200).json({
        success: true,
        data: token,
    });
});

export default authRoute;
