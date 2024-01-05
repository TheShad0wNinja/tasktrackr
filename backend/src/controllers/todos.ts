import { TodoModel } from '@/models/todo'
import express, { Request, Response } from 'express'
import multer from 'multer';

const controller = express.Router();

controller.get('/', async (req: Request, res: Response) => {
	try {
		const todos = await TodoModel.find().sort({ createdAt: -1 }).lean().exec();
		return res.status(200).json({
			status: "Success",
			data: todos,
		})
	} catch (err) {
		console.error(err);
		res.status(400).json({
			status: "Fail",
			message: "Unable to get data",
			data: [],
		})
	}
})

controller.post("/", multer().none(), async (req: Request, res: Response) => {
	if (!req.body?.title) {
		return res.status(400).json({
			status: "Fail",
			reason: "Invalid body"
		});
	}

	const newTodo = new TodoModel({
		title: req.body.title,
		task: req.body.task || ""
	});

	try {
		newTodo.save();
		return res.status(200).json({
			status: "Success",
			data: newTodo,
		})
	} catch (err) {
		console.error(err);
		return res.status(400).json({
			status: "Fail",
			message: "Failure while saving new todo"
		});
	}
})

controller.get("/:id", async (req: Request, res: Response) => {
	const todo = await TodoModel.findById(req.params.id).lean().exec().catch(
		(err) => {
			console.log(err);
			return null;
		}
	);

	if (todo === null) {
		return res.status(400).json({
			status: "Fail",
			message: "Invalid todo id"
		});
	}

	return res.status(200).json({
		status: "Sucess",
		data: todo
	})
})

controller.put("/:id", multer().none(), async (req: Request, res: Response) => {
	const result = await TodoModel.updateOne({ _id: req.params.id }, { ...req.body }).exec();

	if (!result.acknowledged) {
		console.error("Unable to update todo");
		return res.status(400).json({
			status: "Fail",
			message: "Unable to update todo"
		});
	}

	return res.status(200).json({
		status: "Success",
		data: null,
	});
});

controller.delete("/:id", async (req: Request, res: Response) => {
	const oldTodo = await TodoModel.findOneAndDelete({ _id: req.params.id }).exec().catch(err => {
		console.log(err);
		return null;
	});

	if (oldTodo === null) {
		return res.status(400).json({
			status: "Fail",
			message: "Invalid todo id"
		});
	}

	return res.status(200).json({
		status: "Sucess",
		data: oldTodo,
	})
});

export default controller;
