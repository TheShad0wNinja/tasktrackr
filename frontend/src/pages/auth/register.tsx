import { useAuth } from "@/context/authContext";
import { ChangeEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
    const {
        auth: { isLoggedIn },
        dispatch,
    } = useAuth();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData();
        formData.set("username", form.username);
        formData.set("password", form.password);

        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/auth/register`,
            {
                method: "POST",
                body: formData,
                credentials: "include",
            }
        );

        const data = await res.json();

        if (!data.success) {
            setErrMsg(data.message);
            return;
        }

        navigate("/login");
    }

    return (
        <>
            {errMsg && <h3>{errMsg}</h3>}
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" name="username" />
                <input onChange={handleChange} type="text" name="password" />
                <button type="submit">Register</button>
            </form>
        </>
    );
}
