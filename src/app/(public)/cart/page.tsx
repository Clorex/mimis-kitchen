"use client";

import { useCartContext } from "@/context/CartContext";
import { formatCurrency } from "@/lib/format";

export default function CartPage() {

  const { cart } = useCartContext();

  return (
    <main className="px-5 pt-8 pb-28 max-w-md mx-auto space-y-6">

      <h1 className="text-2xl font-bold">Your Cart</h1>

      {cart.length === 0 && (
        <p className="text-gray-500">Your cart is empty.</p>
      )}

      {cart.map((item:any, index:number) => (

        <div key={`${item.mealId}-${item.portion}-${index}`} className="bg-white rounded-xl shadow p-4 space-y-3">

          <div className="flex gap-4">

            <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.mealName}
                  className="w-full h-full object-cover"
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

    </main>
  );
}
