import React, { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [bag, setBag] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addToBag = (item) => {
    const existingItem = bag.find(bagItem => bagItem.id === item.id);
    if (existingItem) {
      // Si el item ya existe, incrementar su cantidad
      setBag(bag.map(bagItem =>
        bagItem.id === item.id
          ? { ...bagItem, quantity: bagItem.quantity + 1 }
          : bagItem
      ));
    } else {
      // Si es un nuevo item, agregarlo con cantidad 1
      setBag([...bag, { ...item, quantity: 1 }]);
    }
    setCartCount(prev => prev + 1);
  };

  const removeToBag = (itemId) => {
    setBag(bag.filter(item => item.id !== itemId));
    const removedItem = bag.find(item => item.id === itemId);
    if (removedItem) {
      setCartCount(prev => prev - removedItem.quantity);
    }
  };

  const incrementQuantity = (itemId) => {
    setBag(bag.map(item =>
      item.id === itemId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
    setCartCount(prev => prev + 1);
  };

  const decrementQuantity = (itemId) => {
    const item = bag.find(item => item.id === itemId);
    if (item.quantity === 1) {
      // Si la cantidad es 1, remover el item
      removeToBag(itemId);
    } else {
      // Decrementar la cantidad
      setBag(bag.map(item =>
        item.id === itemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ));
      setCartCount(prev => prev - 1);
    }
  };

  const clearBag = () => {
    setBag([]);
    setCartCount(0);
  };

  return (
    <CartContext.Provider value={{
      bag,
      cartCount,
      addToBag,
      removeToBag,
      clearBag,
      incrementQuantity,
      decrementQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
