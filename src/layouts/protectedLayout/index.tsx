import { useAuth } from "@/hooks/auth";
import { useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const authRoutes = ["/login", "/register", "/forget-password"];
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    useLayoutEffect(() => {
        if (user === null && !authRoutes.includes(location.pathname)) {
            navigate("/login");
        }
    }, [user]);

    useLayoutEffect(() => {
        // it's protect user from going to a register and login screen after login
        if (user && authRoutes.includes(location.pathname)) return navigate("/");
    }, [user, location]);
    if (user === undefined) return <>Loading...</>;

    return <>{children}</>;
}

export default ProtectedRoute;
