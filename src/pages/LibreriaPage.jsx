import React, { useState, useEffect } from 'react';
import { PenTool, ShoppingCart } from 'lucide-react';
import { SectionTitle, CategoryPill } from '../components/UI';
import { supabase } from '../supabase'; // Tu conexión

const LibreriaPage = ({ onAddToCart }) => {
  const [activeTab, setActiveTab] = useState('Todo');
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. CARGAR DESDE LA VISTA PÚBLICA
  useEffect(() => {
    async function loadCatalogo() {
      // Usamos la VISTA 'catalogo_web' que filtra lo privado
      const { data, error } = await supabase.from('catalogo_web').select('*');
      if (!error && data) setProductos(data);
      setLoading(false);
    }
    loadCatalogo();
  }, []);

  const filtered = activeTab === 'Todo' 
    ? productos 
    : productos.filter(p => p.categoria === activeTab);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 py-12 max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
         <div className="inline-flex items-center justify-center w-20 h-20 bg-green-400 border-4 border-black rounded-full mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <PenTool className="w-10 h-10 text-white" />
        </div>
        <SectionTitle>TIENDA ONLINE</SectionTitle>
        
        {/* FILTROS */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {["Todo", "Escolar", "Oficina", "Arte"].map(cat => (
            <CategoryPill 
              key={cat} 
              label={cat} 
              active={activeTab === cat} 
              onClick={() => setActiveTab(cat)} 
            />
          ))}
        </div>
      </div>

      {/* GRID PRODUCTOS */}
      {loading ? (
        <p className="text-center text-xl font-bold">Cargando catálogo...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map(prod => (
            <div key={prod.id} className="group relative">
              <div className="bg-white border-4 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-1 transition-all duration-200">
                <div className={`h-48 bg-gray-100 border-b-4 border-black relative overflow-hidden flex items-center justify-center`}>
                  {prod.imagen_url ? (
                     <img src={prod.imagen_url} alt={prod.nombre} className="w-full h-full object-cover mix-blend-multiply" />
                  ) : (
                     <span className="text-gray-400 font-bold text-xs">Sin imagen</span>
                  )}
                  <div className="absolute top-2 right-2 bg-white border-2 border-black px-2 py-1 text-xs font-bold rounded">
                    {prod.categoria}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-black text-lg leading-tight mb-2 h-14 line-clamp-2">{prod.nombre}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xl font-bold bg-yellow-300 px-2 border-2 border-black -rotate-2">${prod.precio}</span>
                    <button 
                      onClick={() => onAddToCart(prod)}
                      className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors border-2 border-transparent hover:border-black"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LibreriaPage;
