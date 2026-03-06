"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCartContext } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

export default function FloatingCart() {
  const { getItemCount, isLoaded } = useCartContext();
  const [isOpen, setIsOpen] = useState(false);

  const itemCount = getItemCount();

  if (!isLoaded) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 bg-orange-500 text-white p-3 rounded-full shadow-xl z-40 hover:bg-orange-600 transition"
      >
        <ShoppingBag size={22} />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
            {itemCount}
          </span>
        )}
      </button>

      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
