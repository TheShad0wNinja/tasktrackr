import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Root from "./pages/Root";
import Home from "./pages/Home";
import { AuthProvider } from "./context/authContext";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import {
    todosLoader,
    todosActions,
    todoLoader,
    todoActions,
	indexTodos,
} from "./routes/todo";
import TodoCreate from "./components/Todo/TodoCreate";
import TodoList from "./components/Todo/TodoList";
import TodoEdit from "./components/Todo/TodoEdit";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path="/"
                element={<Root />}
                errorElement={<ErrorPage />}
            >
				<Route path="/" element={<Home />} loader={todosLoader}/>
	 		</Route>
            <Route path="/auth">
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<Login />} />
			</Route>
        </>
    )
);

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Root />,
//         errorElement: <ErrorPage />,
//         children: [
//             {
//                 path: "/",
//                 element: <Home />,
//					children: [
// 					{
// 						path: "/",
// 						element: <TodoList />,
// 						loader: todosLoader,
// 						children: [
// 							{
// 								path: "/:id",
// 								element: <TodoEdit />,
// 								loader: todoLoader,
// 								action: todoActions,
// 							}
//
// 						]
// 					},
//                     {
//                         path: "/create",
//                         element: <TodoCreate />,
//                         action: todosActions,
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         path: "/login",
//         element: <Login />,
//     },
//     {
//         path: "/register",
//         element: <Register />,
//     },
// ]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
