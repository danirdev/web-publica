import React from 'react';
import { Printer, PenTool, BookOpen, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BrutalButton, SectionTitle } from '../components/UI';
import { TESTIMONIOS } from '../data/mocks';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-in fade-in duration-500">
      {/* HERO */}
      <header className="max-w-6xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-block px-4 py-1 bg-green-300 border-2 border-black rounded-full font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
            ¡Hacemos envíos a todo Perico! 🛵
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-none text-black">
            TU LIBRERÍA <br/>
            <span className="text-blue-500">FAVORITA</span> <br/>
            ESTÁ ONLINE.
          </h1>
          <p className="text-xl font-medium text-gray-600 max-w-md">
            Sube tus archivos para imprimir o llena tu mochila sin salir de casa. Rápido, fácil y colorido.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <BrutalButton color="bg-yellow-400" onClick={() => navigate('/libreria')}>
              Ver Catálogo
            </BrutalButton>
            <BrutalButton color="bg-white" textColor="text-black" onClick={() => navigate('/impresiones')}>
              Subir Archivos <Printer className="w-4 h-4"/>
            </BrutalButton>
          </div>
        </div>
        
        {/* Imagen Abstracta */}
        <div className="relative h-80 md:h-96 hidden md:block">
          <div className="absolute inset-0 bg-blue-500 rounded-3xl border-4 border-black transform rotate-3 translate-x-4 translate-y-4"></div>
          <div className="absolute inset-0 bg-white rounded-3xl border-4 border-black overflow-hidden flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 p-8 w-full h-full opacity-80">
                <div className="bg-pink-200 rounded-xl border-2 border-black"></div>
                <div className="bg-yellow-200 rounded-full border-2 border-black"></div>
                <div className="bg-green-200 rounded-full border-2 border-black col-span-2"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-6 py-3 border-2 border-black font-black text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-6">
                  DESDE 2010
                </span>
              </div>
          </div>
        </div>
      </header>
  
      {/* SERVICIOS RAPIDOS */}
      <section className="bg-blue-500 py-16 border-y-4 border-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-end mb-8 text-white">
            <SectionTitle color="text-white">¿QUÉ NECESITAS?</SectionTitle>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Impresiones", icon: Printer, color: "bg-pink-400", desc: "Láser color y B/N al toque.", path: '/impresiones' },
              { title: "Útiles Escolares", icon: PenTool, color: "bg-yellow-400", desc: "Todo para la cartuchera.", path: '/libreria' },
              { title: "Anillados", icon: BookOpen, color: "bg-green-400", desc: "Tus apuntes bien ordenados.", path: '/impresiones' }
            ].map((item, i) => (
              <div 
                key={i} 
                onClick={() => navigate(item.path)}
                className={`${item.color} p-8 rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer`}
              >
                <div className="w-16 h-16 bg-white border-2 border-black rounded-full flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-black mb-2">{item.title}</h3>
                <p className="font-bold opacity-80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  
      {/* TESTIMONIOS */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black mb-4">LO QUE DICEN LOS CLIENTES 💬</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIOS.map((t, i) => (
            <div key={i} className={`${t.color} p-6 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
               <div className="flex gap-1 mb-4">
                 {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 fill-black text-black" />)}
               </div>
               <p className="font-bold text-lg mb-4">"{t.texto}"</p>
               <p className="font-black text-right">- {t.nombre}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
