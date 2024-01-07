import { Todo, TodoModel } from "@/models/todo";

export async function indexTodos() {
    const todos = await TodoModel.find().sort({ createdAt: -1 });
    return todos;
}

export async function createTodo({
    title,
    task,
}: {
    title: string;
    task?: string;
}) {
    console.log(title);
    if (!title) {
        throw new Error("Invalid body");
    }

    const newTodo = new TodoModel({
        title: title,
        task: task || "",
    });

    newTodo.save();
    return newTodo;
}

export async function showTodo(id: string) {
    const todo = await TodoModel.findById(id);

    if (!todo) {
        throw new Error("Invalid Id");
    }

    return todo;
}

export async function editTodo(id: string, todo: Todo) {
    const newTodo = await TodoModel.findOneAndUpdate({ _id: id }, { ...todo });

    if (!newTodo) {
        throw new Error("Invalid Id");
    }

    return newTodo;
}

export async function destroyTodo(id: string) {
	const result = await TodoModel.findOneAndDelete({ _id: id });

	if (!result) {
        throw new Error("Invalid Id");
	}
}
