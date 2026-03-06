"use client";

import { useEffect, useState, useCallback } from "react";
import { CartItem } from "@/types";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("mimi-cart");
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch {
        setCart([]);
      }
    }
    setIsLoaded(true);
  }, []);

  const saveCart = useCallback((items: CartItem[]) => {
    setCart(items);
    localStorage.setItem("mimi-cart", JSON.stringify(items));
  }, []);

  const addToCart = useCallback(
    (item: CartItem) => {
      setCart((prevCart) => {
        const existingIndex = prevCart.findIndex(
          (i) =>
            i.mealId === item.mealId &&
            i.portion === item.portion &&
            JSON.stringify(i.proteins) === JSON.stringify(item.proteins)
        );

        let updated;
        if (existingIndex > -1) {
          updated = [...prevCart];
          updated[existingIndex].quantity += item.quantity;
        } else {
          updated = [...prevCart, item];
        }
        localStorage.setItem("mimi-cart", JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  const updateQuantity = useCallback((index: number, quantity: number) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        const updated = prevCart.filter((_, i) => i !== index);
        localStorage.setItem("mimi-cart", JSON.stringify(updated));
        return updated;
      }
      const updated = [...prevCart];
      updated[index].quantity = quantity;
      localStorage.setItem("mimi-cart", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeItem = useCallback((index: number) => {
    setCart((prevCart) => {
      const updated = prevCart.filter((_, i) => i !== index);
      localStorage.setItem("mimi-cart", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.setItem("mimi-cart", JSON.stringify([]));
  }, []);

  const getTotal = useCallback(() => {
    return cart.reduce((sum, item) => {
      const proteinTotal = item.proteins?.reduce((p, pr) => p + pr.price, 0) || 0;
      return sum + (item.price + proteinTotal) * item.quantity;
    }, 0);
  }, [cart]);

  const getItemCount = useCallback(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return {
    cart,
    isLoaded,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    getTotal,
    getItemCount,
  };
}
