import {
    createTodo,
    destroyTodo,
    editTodo,
    indexTodos,
    showTodo,
} from "@/controllers/todoController";
import express, { Request, Response } from "express";
import multer from "multer";
import jwt, { JwtPayload } from "jsonwebtoken";
declare module "jsonwebtoken" {
    export interface JwtPayload {
        userId: string;
        username: string;
    }
}

const todosRoute = express.Router();

function checkJwt(req: Request, res: Response) {
    const token = jwt.decode(req.cookies?.access_token) as JwtPayload;

    if (!token) {
        res.status(400).json({
            success: false,
            message: "Invalid authentication",
        });
    }

    return token;
}

todosRoute.get("/", async (req: Request, res: Response) => {
    const token = checkJwt(req, res);

    indexTodos(token.userId)
        .then((todos) =>
            res.status(200).json({
                success: true,
                data: todos,
            })
        )
        .catch((err) => {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Unable to retreive data",
            });
        });
});

todosRoute.post("/", multer().none(), async (req: Request, res: Response) => {
    const token = jwt.decode(req.cookies?.access_token) as jwt.JwtPayload;

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Invalid authentication",
        });
    }

    createTodo(token.userId, { ...req.body })
        .then((todo) =>
            res.status(200).json({
                success: true,
                data: todo,
            })
        )
        .catch((err) => {
            console.error(err);
            return res.status(400).json({
                success: false,
                message: err?.message,
            });
        });
});

todosRoute.get("/:id", async (req: Request, res: Response) => {
    const token = jwt.decode(req.cookies?.access_token) as JwtPayload;

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Invalid authentication",
        });
    }

    showTodo(token.userId, req.params.id)
        .then((todo) =>
            res.status(200).json({
                success: true,
                data: todo,
            })
        )
        .catch((err) =>
            res.status(400).json({
                success: false,
                message: err?.message,
            })
        );
});

todosRoute.put("/:id", multer().none(), async (req: Request, res: Response) => {
    const token = checkJwt(req, res);

    editTodo(token.userId, req.params.id, req.body)
        .then((todo) =>
            res.status(200).json({
                success: true,
                data: todo,
            })
        )
        .catch((err) =>
            res.status(400).json({
                success: false,
                message: err?.message,
            })
        );
});

todosRoute.delete("/:id", async (req: Request, res: Response) => {
    const token = checkJwt(req, res);

    destroyTodo(token.userId, req.params.id)
        .then(() =>
            res.status(202).json({
                success: true,
            })
        )
        .catch((err) =>
            res.status(400).json({
                success: false,
                message: err?.message,
            })
        );
});

export default todosRoute;
