import React from 'react';
import { Printer, Upload } from 'lucide-react';
import { SectionTitle } from '../components/UI';
import { PRECIOS_IMPRESION } from '../data/mocks';
import { Helmet } from 'react-helmet-async';

const ImpresionesPage = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 py-12 max-w-4xl mx-auto px-4">
      <Helmet>
        <title>Centro de Copiado | Fotocopias Ramos</title>
        <meta name="description" content="Envía tus archivos para imprimir y retira sin esperas. Consultá nuestra lista de precios oficial." />
      </Helmet>
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-400 border-4 border-black rounded-full mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Printer className="w-10 h-10 text-white" />
        </div>
        <SectionTitle>CENTRO DE COPIADO</SectionTitle>
        <p className="text-xl font-medium text-gray-600">Envía tus archivos y retira sin esperas.</p>
      </div>
  
      {/* LISTA DE PRECIOS */}
      <div className="bg-white border-4 border-black rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12">
        <div className="bg-black text-white p-4 font-black text-xl text-center border-b-4 border-black">
          LISTA DE PRECIOS OFICIAL
        </div>
        <div className="divide-y-2 divide-black">
          {PRECIOS_IMPRESION.map((item, i) => (
            <div key={i} className="flex justify-between items-center p-4 hover:bg-yellow-50 transition-colors">
              <div>
                <h4 className="font-bold text-lg">{item.servicio}</h4>
                <p className="text-sm text-gray-500 font-bold">{item.detalle}</p>
              </div>
              <span className="font-black text-xl bg-green-300 px-3 py-1 border-2 border-black rounded-lg transform rotate-2">
                {item.precio}
              </span>
            </div>
          ))}
        </div>
      </div>
  
      {/* COMO FUNCIONA */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-blue-100 p-6 sm:p-8 border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="font-black text-2xl mb-4 flex items-center gap-2">
            <Upload className="w-6 h-6" /> SUBIR ARCHIVOS
          </h3>
          <p className="font-bold mb-6">Arrastra tus PDF, Word o imágenes aquí para cotizar.</p>
          <button 
            type="button"
            className="w-full border-4 border-dashed border-black bg-white rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
            onClick={() => {}} // TODO: Implement upload logic
            aria-label="Subir archivos para cotización"
          >
             <Upload className="w-10 h-10 text-gray-400 mb-2" />
             <span className="font-bold text-gray-400">Clic para subir</span>
          </button>
        </div>
  
        <div className="bg-yellow-100 p-6 sm:p-8 border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="font-black text-2xl mb-4">¿CÓMO RETIRO?</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
               <div className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
               <p className="font-bold">Te avisamos por WhatsApp cuando esté listo.</p>
            </li>
            <li className="flex items-start gap-3">
               <div className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
               <p className="font-bold">Pasas por el local (fila express).</p>
            </li>
            <li className="flex items-start gap-3">
               <div className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
               <p className="font-bold">O te lo enviamos con nuestro cadete ($500 envío).</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

export default ImpresionesPage;
