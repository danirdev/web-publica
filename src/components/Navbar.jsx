import React, { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react'; // Removing imports not used here
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ cartCount, onCartClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) => 
    `${isActive ? 'underline decoration-wavy decoration-2 underline-offset-4 text-black' : 'text-gray-500'} hover:text-black transition-colors`;

  return (
    <nav className="border-b-4 border-black bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link 
            to="/"
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-10 h-10 bg-yellow-400 border-2 border-black rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="font-black text-xl">R</span>
            </div>
            <span className="text-2xl font-black tracking-tighter hidden sm:block">RAMOS</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 font-bold text-sm">
            {[
              { path: '/', label: 'INICIO' },
              { path: '/impresiones', label: 'IMPRESIONES' },
              { path: '/libreria', label: 'LIBRERÍA' },
              { path: '/contacto', label: 'CONTACTO' },
            ].map(link => (
              <NavLink 
                key={link.path}
                to={link.path}
                className={navLinkClass}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex gap-3">
             <button 
               onClick={onCartClick}
               className="p-2 border-2 border-black rounded-full hover:bg-gray-100 relative transition-transform active:scale-95"
             >
               <ShoppingCart className="w-5 h-5" />
               {cartCount > 0 && (
                 <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-black">
                   {cartCount}
                 </span>
               )}
             </button>
             <button 
                className="md:hidden p-2 border-2 border-black rounded-lg active:bg-gray-100"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
             >
               {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
             </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-4 border-black bg-white p-4 flex flex-col gap-2 absolute w-full shadow-xl">
             {[
              { path: '/', label: 'INICIO' },
              { path: '/impresiones', label: 'IMPRESIONES' },
              { path: '/libreria', label: 'LIBRERÍA' },
              { path: '/contacto', label: 'CONTACTO' },
            ].map(link => (
              <Link 
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left p-3 font-bold border-2 border-transparent rounded-lg hover:bg-gray-100`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
  );
};

export default Navbar;
