import {
    createTodo,
    destroyTodo,
    editTodo,
    indexTodos,
    showTodo,
} from "@/controllers/todoController";
import express, { Request, Response } from "express";
import multer from "multer";
import "dotenv/config";
import { checkToken } from "@/util/jwt";

const todosRoute = express.Router();

todosRoute.get("/", async (req: Request, res: Response) => {
    const [token, err] = checkToken(req.cookies?.access_token);

    if (err !== null) {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

    indexTodos(token.userId)
        .then((todos) =>
            res.status(200).json({
                success: true,
                data: todos,
            })
        )
        .catch(() => {
            return res.status(500).json({
                success: false,
                message: "Unable to retrieve data",
            });
        });
});

todosRoute.post("/", multer().none(), async (req: Request, res: Response) => {
    const [token, err] = checkToken(req.cookies?.access_token);

    if (err !== null) {
        return res.status(400).json({
            success: false,
            message: err.message,
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
    const [token, err] = checkToken(req.cookies?.access_token);

    if (err !== null) {
        return res.status(400).json({
            success: false,
            message: err.message,
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
    const [token, err] = checkToken(req.cookies?.access_token);

    if (err !== null) {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

    editTodo(token.userId, req.params.id, req.body)
        .then(() =>
            res.status(203).json({
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

todosRoute.delete("/:id", async (req: Request, res: Response) => {
    const [token, err] = checkToken(req.cookies?.access_token);

    if (err !== null) {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

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
