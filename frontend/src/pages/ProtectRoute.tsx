import { useAuth } from "@/context/authContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const {
        auth: { isLoggedIn },
    } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to={"/login"} />;
    }
    return <Outlet />;
}
