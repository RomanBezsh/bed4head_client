import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/common/Header.jsx";
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import AccountDashboard from "./pages/AccountDashboard.jsx";
import HotelPage from "./pages/HotelPage.jsx";
import Booking from "./pages/Booking.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

// Layout component controls whether Header should be shown
function Layout() {
    const location = useLocation();

    // Hide header on admin pages
    const isAdminPage = location.pathname.startsWith("/admin");

    return (
        <>
            {/* Show Header only on non-admin pages */}
            {!isAdminPage && <Header />}

            {/* Application routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/hotel/:id" element={<HotelPage />} />
                <Route path="/account" element={<AccountDashboard />} />
                <Route path="/booking" element={<Booking />} />
            </Routes>
        </>
    );
}

// Main application component
function App() {
    return (
        <div className="App h-auto font-nunito-sans">
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </div>
    );
}

export default App;