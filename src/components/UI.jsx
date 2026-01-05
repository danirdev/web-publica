import React from 'react';

export const BrutalButton = ({ children, color = 'bg-black', textColor = 'text-white', onClick, className = '' }) => (
  <button 
    onClick={onClick}
    className={`${color} ${textColor} px-6 py-3 font-bold border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-none active:translate-y-[4px] active:translate-x-[4px] flex items-center justify-center gap-2 ${className}`}
  >
    {children}
  </button>
);

export const CategoryPill = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-full font-bold border-2 border-black transition-all ${
      active 
        ? 'bg-yellow-400 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
        : 'bg-white text-gray-600 hover:bg-gray-50'
    }`}
  >
    {label}
  </button>
);

export const SectionTitle = ({ children, color = "text-black" }) => (
  <h2 className={`text-4xl md:text-5xl font-black mb-8 ${color} drop-shadow-sm`}>
    {children}
  </h2>
);
