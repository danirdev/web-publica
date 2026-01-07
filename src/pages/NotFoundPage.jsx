import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center animate-in fade-in zoom-in duration-300">
      <Helmet>
        <title>Página no encontrada | Fotocopias Ramos</title>
      </Helmet>
      <div className="bg-yellow-400 p-6 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
         <Search className="w-16 h-16 text-black" />
      </div>
      
      <h1 className="text-6xl font-black mb-2">404</h1>
      <h2 className="text-3xl font-bold mb-6">Página no encontrada</h2>
      
      <p className="text-gray-600 max-w-md text-lg mb-8 font-medium">
        Parece que te has perdido. La página que buscas no existe o ha sido movida.
      </p>

      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-bold border-2 border-black 
                   hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                   active:translate-y-[2px] active:shadow-none transition-all"
      >
        <Home className="w-5 h-5" />
        VOLVER AL INICIO
      </button>
    </div>
  );
};

export default NotFoundPage;
