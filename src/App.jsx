import Header from './components/common/Header.jsx'
import Home from './pages/Home.jsx'
// import Catalog from './pages/Catalog' 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Catalog from "./pages/Catalog.jsx";

function App() {
    return (
        <BrowserRouter>
            <div className="App h-auto font-nunito-sans">
                <Header />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<Catalog />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;