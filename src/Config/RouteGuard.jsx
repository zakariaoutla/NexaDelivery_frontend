import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.jsx";

const dashboardByRole = {
    ADMIN: "/admin",
    DRIVER: "/driver",
    MERCHANT: "/merchant",
};

const RouteGuard = ({
                        children,
                        allowedRoles,
                        guestOnly = false,
                    }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (guestOnly) {
        if (user) {
            const dashboardPath = dashboardByRole[user.role] ?? "/";
            return <Navigate to={dashboardPath} replace />;
        }

        return children;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default RouteGuard;