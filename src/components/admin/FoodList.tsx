"use client";

import { useEffect, useState } from "react";
import { getFoods, deleteFood, updateFood } from "@/lib/db";

export default function FoodList() {
  const [foods, setFoods] = useState<any[]>([]);

  const loadFoods = async () => {
    const data = await getFoods();
    setFoods(data);
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteFood(id);
    loadFoods();
  };

  const toggleField = async (id: string, field: string, value: boolean) => {
    await updateFood(id, { [field]: !value });
    loadFoods();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">All Foods</h2>

      {foods.map((food) => (
        <div
          key={food.id}
          className="bg-white rounded-3xl p-5 shadow-md space-y-3"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">{food.title}</h3>
            <button
              onClick={() => handleDelete(food.id)}
              className="text-red-500 text-sm"
            >
              Delete
            </button>
          </div>

          <p className="text-gray-600 text-sm">{food.description}</p>

          <p className="font-bold text-orange-600">
            ₦{food.price?.toLocaleString()}
          </p>

          <div className="flex gap-4 text-sm">
            <button
              onClick={() =>
                toggleField(food.id, "isAvailable", food.isAvailable)
              }
              className={`px-3 py-1 rounded-full ${
                food.isAvailable
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-200"
              }`}
            >
              {food.isAvailable ? "Available" : "Unavailable"}
            </button>

            <button
              onClick={() =>
                toggleField(food.id, "isSpecial", food.isSpecial)
              }
              className={`px-3 py-1 rounded-full ${
                food.isSpecial
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-200"
              }`}
            >
              {food.isSpecial ? "Special" : "Not Special"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
