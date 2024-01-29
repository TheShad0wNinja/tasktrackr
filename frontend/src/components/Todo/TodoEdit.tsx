import { Form, useActionData, Link, useLoaderData } from "react-router-dom";
import { IconX } from "@tabler/icons-react";

export default function TodoEdit() {
    const {todo} = useLoaderData() as any;
    const actionData = useActionData() as any;

    return (
        <div className="relative border-base-300 border-2 rounded-2xl p-4">
            <Link to={"/"} className="absolute top-3 right-3">
                <IconX />
            </Link>
            <Form method="put">
                {actionData?.error && (
                    <span className="text-error">{actionData?.error}</span>
                )}
                <input
                    type="text"
                    className="bg-transparent block mb-2 w-full font-semibold text-xl border-none outline-base-300 rounded"
                    name="title"
                    maxLength={80}
                    placeholder="Task title"
                    defaultValue={todo?.title}
                />
                <textarea
                    name="description"
                    className="bg-transparent block w-full text-md border-none outline-base-300 rounded max-h-60"
                    rows={4}
                    placeholder="Task description"
                    defaultValue={todo?.description}
                ></textarea>
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </Form>
        </div>
    );
}
