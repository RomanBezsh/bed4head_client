import Header from './components/Header'
import MainContent from './components/MainContent'
// import Catalog from './pages/Catalog' 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Catalog from "./components/Catalog.jsx";

function App() {
    return (
        <BrowserRouter>
            <div className="App h-auto font-nunito-sans">
                <Header />

                <Routes>
                    <Route path="/" element={<MainContent />} />
                    <Route path="/catalog" element={<Catalog />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;