"use client";

import { useEffect, useState } from "react";
import { getFoods } from "@/lib/db";
import Image from "next/image";

export default function MenuPage() {
  const [foods, setFoods] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getFoods();
      setFoods(data);
    };
    load();
  }, []);

  return (
    <main className="px-6 pt-6 pb-28 space-y-8">
      <h1 className="text-2xl font-bold">Our Menu</h1>

      <div className="grid grid-cols-2 gap-4">
        {foods.map((food) => (
          <div key={food.id} className="bg-white rounded-2xl p-3 shadow-sm">

            {food.images?.[0]?.url && (
              <Image
                src={food.images[0].url}
                alt={food.title}
                width={300}
                height={200}
                className="rounded-xl object-cover mb-2"
              />
            )}

            <p className="font-medium text-sm">{food.title}</p>

            {food.portionOptions?.[0] && (
              <p className="text-sm text-orange-600 font-semibold">
                ₦{food.portionOptions[0].price}
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
