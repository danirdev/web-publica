import React from 'react';
import { Heart, Zap } from 'lucide-react';

const Footer = () => (
  <footer className="bg-black text-white py-12 border-t-4 border-black mt-auto">
    <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-black text-yellow-400">RAMOS</h2>
        <p className="font-medium text-gray-400">© {new Date().getFullYear()}. Hecho con ⚡ en Jujuy.</p>
      </div>
      <div className="flex gap-4">
        <div className="w-12 h-12 bg-pink-500 rounded-full border-2 border-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-[0px_0px_10px_rgba(236,72,153,0.5)]">
          <Heart className="w-6 h-6 fill-current" />
        </div>
        <div className="w-12 h-12 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-[0px_0px_10px_rgba(59,130,246,0.5)]">
          <Zap className="w-6 h-6 fill-current" />
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
