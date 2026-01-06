import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { supabase } from '../supabase';
import { SectionTitle } from '../components/UI';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cart, total, clearCart } = useCart();
  const [cliente, setCliente] = useState({ nombre: '', telefono: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePedido = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setLoading(true);

    try {
      // 1. Crear cabecera de Venta (Estado PENDIENTE)
      const { data: venta, error: errorVenta } = await supabase
        .from('ventas')
        .insert([{
          total: total,
          metodo_pago: 'Web', // Identificador clave
          estado: 'pendiente',
          cliente_nombre: cliente.nombre,
          cliente_telefono: cliente.telefono
          // usuario_id queda NULL porque es anónimo
        }])
        .select()
        .single();

      if (errorVenta) throw errorVenta;

      // 2. Crear detalles
      const detalles = cart.map(item => ({
        venta_id: venta.id,
        producto_id: item.id,
        cantidad: item.cantidad,
        precio_unitario: item.precio,
        subtotal: item.cantidad * item.precio
      }));

      const { error: errorDetalle } = await supabase.from('detalle_ventas').insert(detalles);
      if (errorDetalle) throw errorDetalle;

      // 3. Éxito
      alert(`¡Pedido #${venta.id} enviado! Pasa a retirarlo por el local.`);
      clearCart();
      navigate('/'); // Volver al inicio

    } catch (error) {
      console.error(error);
      alert('Error enviando pedido: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) return <div className="text-center py-20 font-bold">Tu carrito está vacío</div>;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
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
              className="w-full border-2 border-black p-2 rounded-lg"
              value={cliente.nombre}
              onChange={e => setCliente({...cliente, nombre: e.target.value})}
              placeholder="Ej: Juan Pérez"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Teléfono / WhatsApp</label>
            <input 
              required
              type="tel" 
              className="w-full border-2 border-black p-2 rounded-lg"
              value={cliente.telefono}
              onChange={e => setCliente({...cliente, telefono: e.target.value})}
              placeholder="Ej: 388 123 4567"
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-green-400 border-2 border-black py-3 rounded-lg font-black hover:bg-green-500 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[4px]"
          >
            {loading ? 'Enviando...' : 'CONFIRMAR PEDIDO'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
