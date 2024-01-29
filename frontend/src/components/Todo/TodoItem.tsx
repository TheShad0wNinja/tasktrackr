import { updateTodo } from "@/routes/todo";
import { IconEdit, IconTrash, IconX } from "@tabler/icons-react";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
};

export default function TodoItem({ id, title, description, completed }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");
	const navigate = useNavigate();

    async function handleSubmit(e: any) {
        e.preventDefault();

        setIsLoading(true);
		const formData = new FormData(e.target);
        const data = await updateTodo(id, formData);
        setIsLoading(false);

        if (!data.success) {
            return setErr(data.message);
        }

		setErr("");
		navigate('/');	
        setIsEditing(false);
    }

    if (isEditing)
        return (
            <div className="relative border-base-300 border-2 rounded-2xl p-4">
                <button
                    className={`absolute top-3 right-4 ${
                        isLoading && "loading"
                    }`}
                    onClick={() => setIsEditing(false)}
                    disabled={isLoading}
                >
                    <IconX />
                </button>
                <form onSubmit={handleSubmit}>
                    {err && <span className="text-error">{err}</span>}
                    <input
                        type="text"
                        className="bg-transparent block mb-2 w-full font-semibold text-xl border-none outline-base-300 rounded"
                        name="title"
                        maxLength={80}
                        placeholder="Task title"
                        defaultValue={title}
                    />
                    <textarea
                        name="description"
                        className="bg-transparent block w-full text-md border-none outline-base-300 rounded max-h-60"
                        rows={4}
                        placeholder="Task description"
                        defaultValue={description}
                    ></textarea>
                    <button
                        type="submit"
                        className={`btn btn-primary ${isLoading && "loading"}`}
                        disabled={isLoading}
                    >
                        Update
                    </button>
                </form>
            </div>
        );

    return (
        <div className="p-4 border-base-300 border-2 rounded-2xl flex items-center">
            <div>
                <h1 className="text-xl">{title}</h1>{" "}
                <span className="line-clamp-1 text-md text-gray-700">
                    {description}
                </span>
            </div>
            <div className="ml-auto flex items-center">
                <button onClick={() => setIsEditing(true)}>
                    <IconEdit className="text-accent" />
                </button>
                <IconTrash className="text-error" />
            </div>
        </div>
    );
}
