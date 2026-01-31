import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function RequireAuth({ children }) {
    const { currentUser } = useAuth();
    const location = useLocation();

    if (!currentUser) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience.
        // For simplicity, default to admin login if unrestricted, or we can check path.
        const isStudentRoute = location.pathname.startsWith('/student');
        const redirectPath = isStudentRoute ? "/student/login" : "/admin/login";

        return <Navigate to={redirectPath} state={{ from: location }} replace />;
    }

    return children;
}
