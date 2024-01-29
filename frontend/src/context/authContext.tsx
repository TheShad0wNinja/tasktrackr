import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useReducer,
} from "react";
import cookies from "react-cookies";

type State = {
    isLoggedIn: boolean;
    username: string | null;
    userId: string | null;
};

const initialState: State = {
    isLoggedIn: false,
    username: null,
    userId: null,
};

type AuthAction =
    | { type: "LOGIN"; value: Omit<State, "isLoggedIn"> }
    | { type: "LOGOUT" };

function authReducer(_: State, action: AuthAction) {
    switch (action.type) {
        case "LOGIN":
            return {
                isLoggedIn: true,
                username: action.value.username,
                userId: action.value.userId,
            };
        case "LOGOUT":
            return {
                isLoggedIn: false,
                username: null,
                userId: null,
            };
    }
}

type AuthContextProps = {
    auth: State;
    dispatch: React.Dispatch<AuthAction>;
};

const AuthContext = createContext<AuthContextProps>({
    auth: initialState,
    dispatch: () => {},
});

type Props = {
    children: ReactNode;
};

export function AuthProvider({ children }: Props) {
    const [auth, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const token = cookies.load("access_token");
        if (!token) {
            console.log("Token not present");
            return;
        }

        fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res.data);

                if (!res.success) {
                    cookies.remove("access_token");
                    return;
                }

                dispatch({
                    type: "LOGIN",
                    value: {
                        userId: res.data.userId,
                        username: res.data.username,
                    },
                });
            });
    }, []);

    return (
        <AuthContext.Provider value={{ auth, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
