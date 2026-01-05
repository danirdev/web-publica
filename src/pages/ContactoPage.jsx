import React from 'react';
import { MapPin, Clock, Phone, HelpCircle, ArrowRight } from 'lucide-react';
import { SectionTitle } from '../components/UI';

const ContactoPage = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 py-12 max-w-4xl mx-auto px-4">
    <div className="text-center mb-12">
      <SectionTitle>¿DÓNDE ESTAMOS?</SectionTitle>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      {/* INFO */}
      <div className="bg-white border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-8">
        <div className="flex items-start gap-4">
          <div className="bg-blue-200 p-3 border-2 border-black rounded-full">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-xl">DIRECCIÓN</h3>
            <p className="font-bold text-gray-600">Av. Principal 1234, Ciudad Perico</p>
            <p className="text-sm text-gray-500">(Frente a la plaza central)</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
           <div className="bg-pink-200 p-3 border-2 border-black rounded-full">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-xl">HORARIOS</h3>
            <p className="font-bold text-gray-600">Lun - Vie: 8:00 a 13:00 / 17:00 a 21:00</p>
            <p className="font-bold text-gray-600">Sábados: 9:00 a 13:00</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
           <div className="bg-green-200 p-3 border-2 border-black rounded-full">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-xl">CONTACTO</h3>
            <p className="font-bold text-gray-600">WhatsApp: 388 123 4567</p>
            <p className="font-bold text-gray-600">Email: hola@ramos.com</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="space-y-4">
        <h3 className="font-black text-2xl mb-4 flex items-center gap-2">
          <HelpCircle className="w-6 h-6" /> PREGUNTAS FRECUENTES
        </h3>
        {[
          "¿Imprimen fotos tipo polaroid?",
          "¿Hacen descuentos por cantidad?",
          "¿Venden libros escolares?",
          "¿Tienen servicio técnico de PC?"
        ].map((q, i) => (
          <div key={i} className="bg-yellow-50 border-2 border-black p-4 rounded-xl font-bold cursor-pointer hover:bg-yellow-200 transition-colors flex justify-between items-center group">
            {q}
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ContactoPage;
