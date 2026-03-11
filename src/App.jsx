import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header.jsx";
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import AccountDashboard from "./components/AccountDashboard/AccountDashboard";

function MainLayout({ children }) {
    return (
        <div className="App h-auto font-nunito-sans">
            <Header />
            {children}
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <MainLayout>
                            <Home />
                        </MainLayout>
                    }
                />
                <Route
                    path="/catalog"
                    element={
                        <MainLayout>
                            <Catalog />
                        </MainLayout>
                    }
                />
                <Route
                    path="/account"
                    element={<AccountDashboard />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
