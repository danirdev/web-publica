import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Intentamos recuperar del localStorage al iniciar
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('carrito');
    return saved ? JSON.parse(saved) : [];
  });

  // Cada vez que cambia el carrito, lo guardamos en el navegador
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cart));
  }, [cart]);

  // Agregar producto
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        // Si ya existe, validamos stock (opcional) y sumamos 1
        return prev.map(p => p.id === product.id ? { ...p, cantidad: p.cantidad + 1 } : p);
      }
      return [...prev, { ...product, cantidad: 1 }];
    });
  };

  // Eliminar producto
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  // Vaciar carrito
  const clearCart = () => setCart([]);

  // Calcular total
  const total = cart.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
  const totalItems = cart.reduce((acc, p) => acc + p.cantidad, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};
