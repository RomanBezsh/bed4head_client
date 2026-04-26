import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/common/Header.jsx";
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import AccountDashboard from "./pages/AccountDashboard.jsx";
import HotelPage from "./pages/HotelPage.jsx";
import Booking from "./pages/Booking.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";
import { UserRole } from "./components/admin/roles.js";

// Layout component controls whether Header should be shown.
const Layout = ({ user }) => {
    const location = useLocation();

    const isAdminPage = location.pathname.startsWith("/admin");

    return (
        <>
            {!isAdminPage && <Header />}

            <Routes>
                <Route path="/" element={<Home />} />

                <Route element={<ProtectedRoute user={user} allowedRole={UserRole.Admin} />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                </Route>

                <Route path="/catalog" element={<Catalog />} />
                <Route path="/hotel" element={<HotelPage />} />
                <Route path="/account" element={<AccountDashboard />} />
                <Route path="/booking" element={<Booking />} />
            </Routes>
        </>
    );
}

const App = () => {
    // Инициализируем состояние синхронно. 
    // Если в localStorage есть данные, мы берем их СРАЗУ, до первого рендера.
    const [user, setUser] = useState(() => {
        const storedData = localStorage.getItem("user");
        if (!storedData) return null;
        try {
            const parsed = JSON.parse(storedData);
            return parsed.user || parsed;
        } catch (e) {
            return null;
        }
    });

    useEffect(() => {
        // Слушатель события для обновления состояния при логине/выходе
        const syncAuth = () => {
            const storedData = localStorage.getItem("user");
            if (storedData) {
                const parsed = JSON.parse(storedData);
                setUser(parsed.user || parsed);
            } else {
                setUser(null);
            }
        };

        window.addEventListener("auth-change", syncAuth);
        return () => window.removeEventListener("auth-change", syncAuth);
    }, []);

    return (
        <div className="App h-auto font-nunito-sans">
            <BrowserRouter>
                <Layout user={user} />
            </BrowserRouter>
        </div>
    );
}

export default App;