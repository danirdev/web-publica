import React, { useState, useEffect } from 'react';
import { PenTool, ShoppingCart, Loader, Search, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { SectionTitle, CategoryPill } from '../components/UI';
import { supabase } from '../supabase'; // Conexión real
import { useCart } from '../context/CartContext'; // Usamos el contexto
import { Helmet } from 'react-helmet-async';

const LibreriaPage = () => {
  const [activeTab, setActiveTab] = useState('Todo');
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Nuevos estados para UX
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('nombre-asc'); // 'nombre-asc', 'precio-asc', 'precio-desc'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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

  // Resetear página al cambiar filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm, sortBy]);

  // Lógica de Filtrado y Ordenamiento
  const filteredAndSorted = productos
    // 1. Filtro Categoría
    .filter(p => activeTab === 'Todo' ? true : p.categoria === activeTab)
    // 2. Filtro Búsqueda
    .filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
    // 3. Ordenamiento
    .sort((a, b) => {
      if (sortBy === 'precio-asc') return a.precio - b.precio;
      if (sortBy === 'precio-desc') return b.precio - a.precio;
      return a.nombre.localeCompare(b.nombre); // Default nombre-asc
    });

  // Paginación
  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredAndSorted.slice(startIndex, startIndex + itemsPerPage);

  const categorias = ["Todo", ...new Set(productos.map(p => p.categoria))];

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 py-12 max-w-6xl mx-auto px-4">
      <Helmet>
        <title>Tienda Online | Fotocopias Ramos</title>
        <meta name="description" content="Catálogo completo de librería. Útiles escolares, oficina y más. Comprá online y recibí en tu casa." />
      </Helmet>
      
      {/* HEADER Y CONTROLES */}
      <div className="text-center mb-12">
         <div className="inline-flex items-center justify-center w-20 h-20 bg-green-400 border-4 border-black rounded-full mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <PenTool className="w-10 h-10 text-white" />
        </div>
        <SectionTitle>TIENDA ONLINE</SectionTitle>
        
        {/* FILTROS DE CATEGORÍA */}
        <div className="flex flex-wrap justify-center gap-3 mt-6 mb-8">
          {categorias.map(cat => (
            <CategoryPill 
              key={cat} 
              label={cat} 
              active={activeTab === cat} 
              onClick={() => setActiveTab(cat)} 
            />
          ))}
        </div>

        {/* BARRA DE HERRAMIENTAS (Búsqueda y Orden) */}
        {!loading && (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-2xl mx-auto bg-gray-50 p-4 rounded-xl border-2 border-dashed border-gray-300">
                {/* Buscador */}
                <div className="relative w-full sm:w-1/2">
                    <input 
                        type="text" 
                        placeholder="Buscar producto..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>

                {/* Ordenar */}
                <div className="relative w-full sm:w-auto">
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full appearance-none pl-10 pr-8 py-2 border-2 border-black rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold text-sm"
                    >
                        <option value="nombre-asc">Nombre (A-Z)</option>
                        <option value="precio-asc">Menor Precio</option>
                        <option value="precio-desc">Mayor Precio</option>
                    </select>
                    <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
            </div>
        )}
      </div>

      {/* RESULTADOS */}
      {loading ? (
        <div className="flex justify-center py-20 text-xl font-bold gap-2">
            <Loader className="animate-spin" /> Cargando catálogo...
        </div>
      ) : filteredAndSorted.length === 0 ? (
        <div className="text-center py-20">
            <p className="text-xl font-bold text-gray-400">No encontramos productos que coincidan.</p>
            <button 
                onClick={() => {setSearchTerm(''); setActiveTab('Todo');}}
                className="mt-4 text-blue-600 hover:underline font-bold"
            >
                Limpiar filtros
            </button>
        </div>
      ) : (
        <>
            {/* Grid de Productos */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {currentProducts.map(prod => (
                <div key={prod.id} className="group relative flex flex-col h-full">
                <div className="bg-white border-4 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-1 transition-all duration-200 flex flex-col h-full">
                    {/* Imagen */}
                    <div className="h-32 sm:h-48 bg-gray-50 border-b-4 border-black relative overflow-hidden flex items-center justify-center">
                        {prod.imagen_url ? (
                            <img src={prod.imagen_url} alt={prod.nombre} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-gray-400 font-bold text-xs">Sin imagen</span>
                        )}
                        <div className="absolute top-2 right-2 bg-white border-2 border-black px-2 py-1 text-xs font-bold rounded hidden sm:block">
                            {prod.categoria}
                        </div>
                    </div>
                    
                    {/* Info */}
                    <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
                    <div>
                        <h3 className="font-black text-sm sm:text-lg leading-tight mb-2 line-clamp-2">{prod.nombre}</h3>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-2 sm:mt-4 gap-2">
                        <span className="text-lg sm:text-xl font-bold bg-yellow-300 px-2 border-2 border-black -rotate-2">
                            ${prod.precio}
                        </span>
                        {/* Lógica de Stock */}
                        {(prod.stock > 0 || prod.es_servicio) ? (
                        <button 
                            onClick={() => addToCart(prod)} 
                            className="w-full sm:w-10 h-8 sm:h-10 bg-black text-white rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors border-2 border-transparent hover:border-black active:scale-95"
                            title="Agregar al carrito"
                        >
                            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        ) : (
                        <div className="flex flex-col items-center sm:items-end w-full sm:w-auto">
                            <span className="text-[10px] sm:text-xs font-bold text-red-500 uppercase tracking-wider mb-1">Sin Stock</span>
                            <button 
                                disabled
                                className="w-full sm:w-10 h-8 sm:h-10 bg-gray-200 text-gray-400 rounded-lg flex items-center justify-center border-2 border-transparent cursor-not-allowed"
                                title="Producto sin stock"
                            >
                                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>
                        )}
                    </div>
                    </div>
                </div>
                </div>
            ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex justify-center items-center gap-4 bg-white p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <button 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 border-2 border-transparent hover:border-black rounded-lg disabled:opacity-30 disabled:hover:border-transparent transition-all"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    
                    <span className="font-black text-lg">
                        Página {currentPage} de {totalPages}
                    </span>

                    <button 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 border-2 border-transparent hover:border-black rounded-lg disabled:opacity-30 disabled:hover:border-transparent transition-all"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>
            )}
        </>
      )}
    </div>
  );
};
export default LibreriaPage;
