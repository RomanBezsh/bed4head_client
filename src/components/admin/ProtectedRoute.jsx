import { Navigate, Outlet } from "react-router-dom";
import { UserRole } from "./roles";

const ProtectedRoute = ({ user, allowedRole }) => {
    
    // Проверяем доступ:
    const userRoleValue = user?.role;
    const isAdminRequired = allowedRole === UserRole.Admin;

    // Прямое сравнение чисел или строк
    const hasAccess = user !== null && (
        Number(userRoleValue) === Number(allowedRole) || 
        (isAdminRequired && String(userRoleValue).toLowerCase() === "admin")
    );

    if (!hasAccess) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;