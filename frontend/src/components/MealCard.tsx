"use client";

import { formatCurrency } from "@/lib/format";

interface MealCardProps {
  meal: any;
  onClick: () => void;
}

export default function MealCard({ meal, onClick }: MealCardProps) {

  const lowestPrice = meal.portions?.[0]?.price || 0;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
    >

      {meal.images?.length ? (
        <img
          src={meal.images[0]}
          alt={meal.name}
          className="w-full h-56 object-cover"
        />
      ) : (
        <div className="h-56 bg-gray-100"></div>
      )}

      <div className="p-6 space-y-2">
        <h3 className="font-semibold text-lg">{meal.name}</h3>

        <p className="text-gray-500 text-sm">
          {meal.description}
        </p>

        <p className="font-semibold text-orange-600">
          From {formatCurrency(lowestPrice)}
        </p>
      </div>

    </div>
  );
}
