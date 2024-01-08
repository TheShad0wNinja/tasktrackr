import { Todo, TodoModel } from "@/models/todo";

export async function indexTodos(userId: string) {
    const todos = await TodoModel.find({ userId }).sort({ createdAt: -1 });
    return todos;
}

export async function createTodo(
    userId: string,
    {
        title,
        task,
    }: {
        userId: string;
        title: string;
        task?: string;
    }
) {
    if (!title || !userId) {
        throw new Error("Invalid body");
    }

    const newTodo = new TodoModel({
        userId,
        title: title,
        task: task || "",
    });

    await newTodo.save();
    return newTodo;
}

export async function showTodo(userId: string, id: string) {
    const todo = await TodoModel.findOne({ _id: id, userId });

    if (!todo) {
        throw new Error("Invalid Id");
    }

    if (todo.userId?.toString() !== userId) {
        throw new Error("Not authorized");
    }

    return todo;
}

export async function editTodo(userId: string, id: string, todo: Todo) {
    const newTodo = await TodoModel.findOneAndUpdate(
        { _id: id, userId },
        { ...todo }
    );

    if (!newTodo) {
        throw new Error("Invalid Id");
    }

    return newTodo;
}

export async function destroyTodo(userId: string, id: string) {
    const result = await TodoModel.findOneAndDelete({ _id: id, userId });

    if (!result) {
        throw new Error("Invalid Id");
    }
}
