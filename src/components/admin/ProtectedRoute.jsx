import { Navigate, Outlet } from "react-router-dom";
import { UserRole } from "./roles";

const ProtectedRoute = ({ user, allowedRole }) => {
    const userRoleValue = user?.role;

    // Доступ разрешен, если:
    // 1. Пользователь авторизован (не null)
    // И (Либо роль не указана, либо она совпадает, либо пользователь — админ)
    const hasAccess = user !== null && (
        !allowedRole || 
        Number(userRoleValue) === Number(allowedRole) || 
        String(userRoleValue).toLowerCase() === "admin"
    );

    if (!hasAccess) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;