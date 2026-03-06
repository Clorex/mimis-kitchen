"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { formatCurrency } from "@/lib/format";

export default function MealModal({ meal, onClose }: any) {

  const [quantity, setQuantity] = useState(1);

  if (!meal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6 space-y-6">

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{meal.name}</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {meal.images?.length && (
          <img
            src={meal.images[0]}
            alt={meal.name}
            className="w-full h-56 object-cover rounded-xl"
          />
        )}

        <p className="text-gray-600">{meal.description}</p>

        <p className="font-bold text-lg text-orange-600">
          {formatCurrency(meal.portions?.[0]?.price)}
        </p>

        <div className="flex items-center justify-between">
          <button
            onClick={()=>setQuantity(q=>Math.max(1,q-1))}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            -
          </button>

          <span>{quantity}</span>

          <button
            onClick={()=>setQuantity(q=>q+1)}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            +
          </button>
        </div>

        <button className="bg-orange-500 text-white w-full py-3 rounded-xl font-semibold">
          Add to Cart
        </button>

      </div>
    </div>
  );
}
