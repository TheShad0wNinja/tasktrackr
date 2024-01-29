import { NavLink, Outlet } from "react-router-dom";
import {IconPlus} from '@tabler/icons-react'
import TodoList from "@/components/Todo/TodoList";

function Home() {
    return (
        <>
            {/* <NavLink */}
            {/*     to={"/create"} */}
            {/*     className={({ isActive }) => `text-lg font-semibold flex gap-1 items-center mb-2 ${isActive ? "hidden" : ""}`} */}
            {/* > */}
            {/*     <IconPlus />Create new todo */}
            {/* </NavLink> */}
            {/* <Outlet /> */}
			<TodoList />
        </>
    );
}

export default Home;
