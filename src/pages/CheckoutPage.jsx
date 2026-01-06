import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // Asegúrate de importar desde el path correcto
import { supabase } from '../supabase';
import { SectionTitle } from '../components/UI';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react'; // Puedes instalar lucide-react si no tienes el ícono

const CheckoutPage = () => {
  const { cart, total, clearCart } = useCart();
  const [cliente, setCliente] = useState({ nombre: '', telefono: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --- CONFIGURACIÓN ---
  // Pon aquí tu número con código de país, sin espacios ni símbolos (+).
  // Ejemplo Argentina: 549 + característica + número
  const TELEFONO_NEGOCIO = "5493881234567"; 
  // ---------------------

  const handlePedido = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setLoading(true);

    try {
      // 1. Guardar en Base de Datos (Igual que antes)
      const { data: venta, error: errorVenta } = await supabase
        .from('ventas')
        .insert([{
          total: total,
          metodo_pago: 'Web', 
          estado: 'pendiente',
          cliente_nombre: cliente.nombre,
          cliente_telefono: cliente.telefono
        }])
        .select()
        .single();

      if (errorVenta) throw errorVenta;

      // 2. Guardar detalles en BD
      const detalles = cart.map(item => ({
        venta_id: venta.id,
        producto_id: item.id,
        cantidad: item.cantidad,
        precio_unitario: item.precio,
        subtotal: item.cantidad * item.precio
      }));

      const { error: errorDetalle } = await supabase.from('detalle_ventas').insert(detalles);
      if (errorDetalle) throw errorDetalle;

      // 3. GENERAR MENSAJE DE WHATSAPP
      // Construimos el texto línea por línea
      const itemsTexto = cart
        .map(item => `- ${item.cantidad}x ${item.nombre} ($${item.cantidad * item.precio})`)
        .join('%0A'); // %0A es el salto de línea para URLs

      const mensaje = `Hola! Soy *${cliente.nombre}*.%0A` +
                      `Acabo de hacer el pedido web *#${venta.id}*.%0A%0A` +
                      `*Detalle del pedido:*%0A${itemsTexto}%0A%0A` +
                      `*Total a pagar: $${total}*`;

      const urlWhatsapp = `https://wa.me/${TELEFONO_NEGOCIO}?text=${mensaje}`;

      // 4. Finalizar
      // Abrimos WhatsApp en una pestaña nueva
      window.open(urlWhatsapp, '_blank');
      
      alert(`¡Pedido #${venta.id} guardado! Se abrirá WhatsApp para enviar el detalle.`);
      clearCart();
      navigate('/'); 

    } catch (error) {
      console.error(error);
      alert('Error enviando pedido: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) return <div className="text-center py-20 font-bold">Tu carrito está vacío</div>;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 animate-in fade-in">
      <SectionTitle>FINALIZAR PEDIDO</SectionTitle>
      
      <div className="bg-white border-4 border-black p-6 rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mt-8">
        {/* Resumen */}
        <div className="space-y-4 mb-8">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between border-b border-gray-200 pb-2">
              <span>{item.cantidad}x {item.nombre}</span>
              <span className="font-bold">${item.cantidad * item.precio}</span>
            </div>
          ))}
          <div className="text-xl font-black text-right pt-2">Total: ${total}</div>
        </div>

        {/* Formulario */}
        <form onSubmit={handlePedido} className="space-y-4">
          <div>
            <label className="block font-bold mb-1">Tu Nombre</label>
            <input 
              required
              type="text" 
              className="w-full border-2 border-black p-2 rounded-lg focus:ring-4 focus:ring-green-200 outline-none"
              value={cliente.nombre}
              onChange={e => setCliente({...cliente, nombre: e.target.value})}
              placeholder="Ej: Juan Pérez"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Teléfono</label>
            <input 
              required
              type="tel" 
              className="w-full border-2 border-black p-2 rounded-lg focus:ring-4 focus:ring-green-200 outline-none"
              value={cliente.telefono}
              onChange={e => setCliente({...cliente, telefono: e.target.value})}
              placeholder="Ej: 388 123 4567"
            />
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
