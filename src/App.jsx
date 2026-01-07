import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ImpresionesPage from './pages/ImpresionesPage';
import LibreriaPage from './pages/LibreriaPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactoPage from './pages/ContactoPage';
import NotFoundPage from './pages/NotFoundPage';

// Wrapper para Layout que necesita location (si fuera necesario animaciones)
// Pero simple por ahora.

import { Toaster } from 'sonner';

const Layout = () => {
    const location = useLocation();

    // Scroll to top on route change
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className="min-h-screen bg-[#FFFDF5] font-sans selection:bg-yellow-300 flex flex-col">
            <Toaster richColors position="top-right" />
            <Navbar />
            
            <main className="grow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/impresiones" element={<ImpresionesPage />} />
                    <Route path="/libreria" element={<LibreriaPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/contacto" element={<ContactoPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
};

import { HelmetProvider } from 'react-helmet-async';

const App = () => {
  return (
    <HelmetProvider>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
