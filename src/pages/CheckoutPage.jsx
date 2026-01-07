import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // Asegúrate de importar desde el path correcto
import { supabase } from '../supabase';
import { SectionTitle } from '../components/UI';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react'; 
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Helmet } from 'react-helmet-async';

const checkoutSchema = z.object({
  nombre: z.string().optional(),
});

const CheckoutPage = () => {
  const { cart, total, clearCart, updateQuantity, removeFromCart } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  // --- CONFIGURACIÓN ---
  // Pon aquí tu número con código de país, sin espacios ni símbolos (+).
  // Ejemplo Argentina: 549 + característica + número
  const TELEFONO_NEGOCIO = "5493886141730"; 
  // ---------------------

  const onSubmit = async (data) => {
    if (cart.length === 0) return;
    setLoading(true);

    try {
      // 1. Usar función RPC segura (Bypassea RLS)
      const { error: errorVenta } = await supabase.rpc('crear_pedido_web', {
        p_cliente_nombre: data.nombre || "Cliente Web",
        p_cliente_telefono: "", // Ya no pedimos teléfono
        p_total: total,
        p_detalles: cart // Pasamos el carrito directo, la función SQL lo procesa
      });

      if (errorVenta) throw errorVenta;

      // 3. GENERAR MENSAJE DE WHATSAPP
      // Construimos el texto línea por línea
      const itemsTexto = cart
        .map(item => `- ${item.cantidad}x ${item.nombre} ($${item.cantidad * item.precio})`)
        .join('\n');

      const nombreCliente = data.nombre ? data.nombre : "Cliente";
      const mensaje = `Hola! Soy *${nombreCliente}* y quiero realizar el siguiente pedido:\n\n` +
                      `*Detalle:* \n${itemsTexto}\n\n` +
                      `*Total a pagar: $${total}*`;

      const urlWhatsapp = `https://wa.me/${TELEFONO_NEGOCIO}?text=${encodeURIComponent(mensaje)}`;

      // 4. Finalizar
      // Abrimos WhatsApp en una pestaña nueva
      window.open(urlWhatsapp, '_blank');
      
      toast.success(`¡Pedido enviado!`); 
      clearCart();
      navigate('/'); 

    } catch (error) {
      console.error(error);
      toast.error('Error enviando pedido: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 animate-in fade-in">
        <Helmet>
            <title>Carrito Vacío | Fotocopias Ramos</title>
        </Helmet>
        <div className="text-6xl">🛒</div>
        <h2 className="text-2xl font-black">Tu carrito está vacío</h2>
        <p className="text-gray-500">¡Agrega algunos productos para continuar!</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-black text-white px-8 py-3 rounded-xl font-bold border-2 border-black hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          VER CATÁLOGO
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 animate-in fade-in">
      <Helmet>
        <title>Finalizar Pedido | Fotocopias Ramos</title>
      </Helmet>
      <SectionTitle>FINALIZAR PEDIDO</SectionTitle>
      
      <div className="bg-white border-4 border-black p-6 rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mt-8">
        {/* Resumen */}
        <div className="space-y-4 mb-8">
          {cart.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-gray-200 pb-4 gap-4">
              <div className="flex-1">
                 <span className="font-bold text-lg">{item.nombre}</span>
                 <div className="text-gray-500 text-sm">${item.precio} u.</div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Controles de Cantidad */}
                <div className="flex items-center border-2 border-black rounded-lg overflow-hidden">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-3 py-1 hover:bg-gray-200 font-bold border-r-2 border-black active:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="px-4 font-bold min-w-12 text-center">{item.cantidad}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-3 py-1 hover:bg-gray-200 font-bold border-l-2 border-black active:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <div className="font-bold text-xl w-24 text-right">
                  ${item.cantidad * item.precio}
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  title="Eliminar del pedido"
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg hover:text-red-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </button>
              </div>
            </div>

          ))}
          <div className="text-xl font-black text-right pt-2">Total: ${total}</div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-bold mb-1">Tu Nombre (Opcional)</label>
            <input 
              type="text" 
              className={`w-full border-2 p-2 rounded-lg focus:ring-4 outline-none ${errors.nombre ? 'border-red-500 focus:ring-red-200' : 'border-black focus:ring-green-200'}`}
              placeholder="Ej: Juan Pérez"
              {...register('nombre')}
            />
            {errors.nombre && <p className="text-red-500 text-sm mt-1 font-medium">{errors.nombre.message}</p>}
          </div>

          <button 
            disabled={loading}
            className="w-full bg-green-500 text-white border-2 border-black py-4 rounded-xl font-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Procesando...' : (
              <>
                <MessageCircle className="w-6 h-6" /> ENVIAR PEDIDO POR WHATSAPP
              </>
            )}
          </button>
          <p className="text-xs text-center text-gray-500 font-medium">
            Al confirmar, se abrirá WhatsApp con el detalle de tu compra.
          </p>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
