"use client";

import { useEffect, useState } from "react";
import { getFoods, deleteFood, updateFood } from "@/lib/db";

export default function FoodTable() {
  const [foods, setFoods] = useState<any[]>([]);

  const loadFoods = async () => {
    const data = await getFoods();
    setFoods(data);
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const toggle = async (id: string, field: string, value: boolean) => {
    await updateFood(id, { [field]: !value });
    loadFoods();
  };

  return (
    <div className="space-y-4">
      {foods.map((food) => (
        <div key={food.id} className="bg-white p-5 rounded-3xl shadow-md space-y-3">
          <div className="flex justify-between">
            <h4 className="font-semibold">{food.title}</h4>
            <button
              onClick={() => deleteFood(food.id).then(loadFoods)}
              className="text-red-500 text-sm"
            >
              Delete
            </button>
          </div>

          <div className="flex gap-4 text-sm">
            <button
              onClick={() => toggle(food.id, "isAvailable", food.isAvailable)}
              className={food.isAvailable ? "text-green-600" : "text-gray-400"}
            >
              Available
            </button>

            <button
              onClick={() => toggle(food.id, "isSpecial", food.isSpecial)}
              className={food.isSpecial ? "text-red-600" : "text-gray-400"}
            >
              Special
            </button>

            <button
              onClick={() => toggle(food.id, "featured", food.featured)}
              className={food.featured ? "text-orange-600" : "text-gray-400"}
            >
              Featured
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
