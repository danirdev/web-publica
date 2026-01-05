import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ImpresionesPage from './pages/ImpresionesPage';
import LibreriaPage from './pages/LibreriaPage';
import ContactoPage from './pages/ContactoPage';

// Wrapper para Layout que necesita location (si fuera necesario animaciones)
// Pero simple por ahora.

const Layout = () => {
    const [cartCount, setCartCount] = useState(0);
    const location = useLocation();

    // Scroll to top on route change
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className="min-h-screen bg-[#FFFDF5] font-sans selection:bg-yellow-300 flex flex-col">
            <Navbar cartCount={cartCount} onCartClick={() => {}} />
            
            <main className="grow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/impresiones" element={<ImpresionesPage />} />
                    <Route path="/libreria" element={<LibreriaPage onAddToCart={() => setCartCount(c => c + 1)} />} />
                    <Route path="/contacto" element={<ContactoPage />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
};

const App = () => {
  return (
    <BrowserRouter>
        <Layout />
    </BrowserRouter>
  );
};

export default App;
