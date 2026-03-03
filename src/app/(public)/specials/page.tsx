"use client";

import { useEffect, useState } from "react";
import { getFoods } from "@/lib/db";
import Image from "next/image";

export default function SpecialsPage() {
  const [specials, setSpecials] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const foods = await getFoods();
      setSpecials(foods.filter((f: any) => f.isSpecial));
    };
    load();
  }, []);

  return (
    <main className="px-6 pt-6 pb-28 space-y-8">
      <h1 className="text-2xl font-bold">Special Offers</h1>

      {specials.map((food) => (
        <div
          key={food.id}
          className="bg-white rounded-3xl p-5 shadow-md space-y-3"
        >
          {food.images?.[0]?.url && (
            <Image
              src={food.images[0].url}
              alt={food.title}
              width={400}
              height={250}
              className="rounded-xl object-cover"
            />
          )}

          <h2 className="font-semibold">{food.title}</h2>

          <p className="text-sm text-gray-600">
            {food.description}
          </p>

          {food.portionOptions?.[0] && (
            <p className="text-orange-600 font-bold">
              ₦{food.portionOptions[0].price}
            </p>
          )}
        </div>
      ))}
    </main>
  );
}