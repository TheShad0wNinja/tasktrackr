import {
    createTodo,
    destroyTodo,
    editTodo,
    indexTodos,
    showTodo,
} from "@/controllers/todoController";
import express, { Request, Response } from "express";
import multer from "multer";

const todosRoute = express.Router();

todosRoute.get("/", async (_, res: Response) =>
    indexTodos()
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
        })
);

todosRoute.post("/", multer().none(), async (req: Request, res: Response) =>
    createTodo({ ...req.body })
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
        })
);

todosRoute.get("/:id", async (req: Request, res: Response) =>
    showTodo(req.params.id)
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
        )
);

todosRoute.put("/:id", multer().none(), async (req: Request, res: Response) =>
    editTodo(req.params.id, req.body)
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
        )
);

todosRoute.delete("/:id", async (req: Request, res: Response) =>
    destroyTodo(req.params.id)
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
        )
);

export default todosRoute;
