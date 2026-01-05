import React, { useState } from 'react';
import { PenTool, ShoppingCart } from 'lucide-react';
import { SectionTitle, CategoryPill } from '../components/UI';
import { PRODUCTOS } from '../data/mocks';

const LibreriaPage = ({ onAddToCart }) => {
  const [activeTab, setActiveTab] = useState('Todo');

  const filtered = activeTab === 'Todo' 
    ? PRODUCTOS 
    : PRODUCTOS.filter(p => p.categoria === activeTab);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filtered.map(prod => (
          <div key={prod.id} className="group relative">
            <div className="bg-white border-4 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-1 transition-all duration-200">
              <div className={`h-48 ${prod.color} border-b-4 border-black relative overflow-hidden`}>
                <img src={prod.imagen} alt={prod.nombre} className="w-full h-full object-cover mix-blend-multiply" />
                <div className="absolute top-2 right-2 bg-white border-2 border-black px-2 py-1 text-xs font-bold rounded">
                  {prod.categoria}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-black text-lg leading-tight mb-2 h-14 line-clamp-2">{prod.nombre}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xl font-bold bg-yellow-300 px-2 border-2 border-black -rotate-2">${prod.precio}</span>
                  <button 
                    onClick={onAddToCart}
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
    </div>
  );
};

export default LibreriaPage;
