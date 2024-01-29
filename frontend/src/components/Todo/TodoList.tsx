import {
    Outlet,
    useLoaderData,
    useNavigate,
    useNavigation,
    useParams,
} from "react-router-dom";
import TodoItem from "./TodoItem";

export default function TodoList() {
    const { todos } = useLoaderData() as any;
    const params = useParams();
    return (
        <>
            {todos.length ? (
                todos.map((todo: any) =>
                    todo._id !== params?.id ? (
                        <TodoItem
                            id={todo._id}
                            title={todo.title}
                            description={todo.task}
                            completed={todo.completed}
                            key={todo._id}
                        />
                    ) : (
                        <Outlet key={todo._id}/>
                    )
                )
            ) : (
                <h1>No Todos Saved</h1>
            )}
        </>
    );
}
