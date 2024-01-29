import { useAuth } from "@/context/authContext";
import Navbar from "@/components/Navbar";
import { Navigate, Outlet } from "react-router-dom";

export default function Root() {
    const {
        auth: { isLoggedIn },
    } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to={"/auth/login"} />;
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto">
                <Outlet />
            </div>
        </>
    );
}
