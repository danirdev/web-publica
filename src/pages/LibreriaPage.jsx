import React, { useState, useEffect } from 'react';
import { PenTool, ShoppingCart, Loader } from 'lucide-react';
import { SectionTitle, CategoryPill } from '../components/UI';
import { supabase } from '../supabase'; // Conexión real
import { useCart } from '../context/CartContext'; // Usamos el contexto
import { Helmet } from 'react-helmet-async';

const LibreriaPage = () => {
  const [activeTab, setActiveTab] = useState('Todo');
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Importamos la función del carrito directamente
  const { addToCart } = useCart();

  // 1. CARGAR DESDE SUPABASE (VISTA PÚBLICA)
  useEffect(() => {
    async function loadCatalogo() {
      try {
        const { data, error } = await supabase.from('catalogo_web').select('*');
        if (error) throw error;
        setProductos(data || []);
      } catch (error) {
        console.error('Error cargando catálogo:', error);
      } finally {
        setLoading(false);
      }
    }
    loadCatalogo();
  }, []);

  // Filtro local
  const filtered = activeTab === 'Todo' 
    ? productos 
    : productos.filter(p => p.categoria === activeTab);

  const categorias = ["Todo", ...new Set(productos.map(p => p.categoria))];

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 py-12 max-w-6xl mx-auto px-4">
      <Helmet>
        <title>Tienda Online | Fotocopias Ramos</title>
        <meta name="description" content="Catálogo completo de librería. Útiles escolares, oficina y más. Comprá online y recibí en tu casa." />
      </Helmet>
      <div className="text-center mb-12">
         <div className="inline-flex items-center justify-center w-20 h-20 bg-green-400 border-4 border-black rounded-full mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <PenTool className="w-10 h-10 text-white" />
        </div>
        <SectionTitle>TIENDA ONLINE</SectionTitle>
        
        {/* FILTROS DINÁMICOS */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {categorias.map(cat => (
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
        <div className="flex justify-center py-20 text-xl font-bold gap-2">
            <Loader className="animate-spin" /> Cargando catálogo...
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos disponibles en esta categoría.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map(prod => (
            <div key={prod.id} className="group relative flex flex-col h-full">
              <div className="bg-white border-4 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-1 transition-all duration-200 flex flex-col h-full">
                {/* Imagen */}
                <div className="h-48 bg-gray-50 border-b-4 border-black relative overflow-hidden flex items-center justify-center">
                    {prod.imagen_url ? (
                        <img src={prod.imagen_url} alt={prod.nombre} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-gray-400 font-bold text-xs">Sin imagen</span>
                    )}
                    <div className="absolute top-2 right-2 bg-white border-2 border-black px-2 py-1 text-xs font-bold rounded">
                        {prod.categoria}
                    </div>
                </div>
                
                {/* Info */}
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-black text-lg leading-tight mb-2 line-clamp-2">{prod.nombre}</h3>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold bg-yellow-300 px-2 border-2 border-black -rotate-2">
                        ${prod.precio}
                    </span>
                    {/* Lógica de Stock: Si tiene stock o es servicio, permite comprar. Si no, muestra "Sin Stock" */}
                    {(prod.stock > 0 || prod.es_servicio) ? (
                      <button 
                        onClick={() => addToCart(prod)} 
                        className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors border-2 border-transparent hover:border-black active:scale-95"
                        title="Agregar al carrito"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    ) : (
                      <div className="flex flex-col items-end">
                          <span className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">Sin Stock</span>
                          <button 
                            disabled
                            className="w-10 h-10 bg-gray-200 text-gray-400 rounded-lg flex items-center justify-center border-2 border-transparent cursor-not-allowed"
                            title="Producto sin stock"
                          >
                            <ShoppingCart className="w-5 h-5" />
                          </button>
                      </div>
                    )}
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
