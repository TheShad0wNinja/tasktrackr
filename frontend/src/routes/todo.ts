import {
    ActionFunctionArgs,
    LoaderFunctionArgs,
    redirect,
    useParams,
} from "react-router-dom";

export async function todosLoader() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
        credentials: "include",
    });
    const data = await res.json();
    if (!data.success) {
        return { todos: [] };
    }

    return { todos: data.data };
}

export async function updateTodo(id: string, formData: FormData) {
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/todos/${id}`,
        {
            method: "PUT",
            credentials: "include",
            body: formData,
        }
    );
    const data = await res.json();
	return data;
}
// export async function todosActions({ request }: ActionFunctionArgs) {
//     switch (request.method) {
//         case "POST":
//             const formData = await request.formData();
//
//             const res = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
//                 method: "POST",
//                 credentials: "include",
//                 body: formData,
//             });
//             const data = await res.json();
//
//             if (!data.success) {
//                 return { error: data.message };
//             }
//
//             return redirect("/");
//         default:
//             return null;
//     }
// }
//
// export async function todoActions({ request, params }: ActionFunctionArgs) {
//     const formData = await request.formData();
//     switch (request.method) {
//         case "PUT":
//             const res = await fetch(
//                 `${import.meta.env.VITE_API_URL}/todos/${params.id}`,
//                 {
//                     method: "PUT",
//                     credentials: "include",
//                     body: formData,
//                 }
//             );
//             const data = await res.json();
//             if (!data.success) {
//                 return { error: data.message };
//             }
//
//             return redirect("/");
//         default:
//             return redirect("/");
//     }
// }
