import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/common/Header.jsx";
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import AccountDashboard from "./pages/AccountDashboard.jsx";
import HotelPage from "./pages/HotelPage.jsx";
import Booking from "./pages/Booking.jsx";


function App() {
    return (
        <div className="App h-auto font-nunito-sans">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home/>
                        }
                    />
                    <Route
                        path="/catalog"
                        element={
                            <Catalog/>
                        }
                    />
                    <Route
                        path="/hotel"
                        element={
                            <HotelPage/>
                        }
                    />
                    <Route
                        path="/account"
                        element={<AccountDashboard/>}
                    />
                    <Route
                        path="/booking"
                        element={<Booking/>}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
