import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header.jsx";
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import AccountDashboard from "./pages/AccountDashboard.jsx";



function App() {
    return (
        <div className="App h-auto font-nunito-sans">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home />
                        }
                    />
                    <Route
                        path="/catalog"
                        element={
                            <Catalog />
                        }
                    />
                    <Route
                        path="/account"
                        element={<AccountDashboard />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
