"use client";

import { useCartContext } from "@/context/CartContext";
import { formatCurrency } from "@/lib/format";

export default function CartDrawer({ isOpen, onClose }: any) {

  const { cart } = useCartContext();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full p-6 space-y-6 overflow-y-auto">

        <h2 className="text-xl font-semibold">Your Cart</h2>

        {cart.length === 0 && (
          <p className="text-gray-500">Your cart is empty.</p>
        )}

        {cart.map((item:any, index:number) => (
          <div
            key={`${item.mealId}-${item.portion}-${index}`}
            className="bg-gray-50 rounded-xl p-4 space-y-3"
          >
            <div className="flex gap-4">

              <div className="w-20 h-20 bg-gray-200 rounded overflow-hidden">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.mealName}
                    className="w-full h-full object-cover rounded"
                  />
                )}
              </div>

              <div className="flex-1">
                <p className="font-semibold">{item.mealName}</p>
                <p className="text-sm text-gray-500">{item.portion}</p>
                <p className="font-bold text-orange-600">
                  {formatCurrency(item.price)}
                </p>
              </div>

            </div>
          </div>
        ))}

        <button
          onClick={onClose}
          className="bg-black text-white w-full py-3 rounded-xl"
        >
          Close
        </button>

      </div>
    </div>
  );
}
