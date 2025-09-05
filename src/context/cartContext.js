"use client";

import { getCart } from "@/component/common/cartUtils";
import { createContext, useState, useContext, useEffect, useMemo } from "react";


const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);

  // ✅ Load cart from localStorage on mount
  useEffect(() => {
    setCartItem(getCart());

    // ✅ Listen for changes to localStorage from other tabs/windows
    const handleStorageChange = () => {
      setCartItem(getCart());
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // ✅ Memoized context value to prevent unnecessary re-renders
  const CartContextValue = useMemo(
    () => ({
      cartItem,
      setCartItem,
      reloadCart: () => setCartItem(getCart()), // optional helper to reload manually
    }),
    [cartItem]
  );

  return (
    <CartContext.Provider value={CartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom hook for easy usage
const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCartContext };
