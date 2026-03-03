"use client";

import { useEffect, useState } from "react";
import { getFoods } from "@/lib/db";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [special, setSpecial] = useState<any>(null);
  const [featured, setFeatured] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const foods = await getFoods();
      setSpecial(foods.find((f: any) => f.isSpecial));
      setFeatured(foods.filter((f: any) => f.featured));
    };
    load();
  }, []);

  return (
    <main className="px-6 pt-6 pb-28 space-y-10">

      {/* HERO */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">
          What Are You Eating Today?
        </h1>

        <button
          onClick={() => router.push("/menu")}
          className="bg-orange-500 text-white px-6 py-3 rounded-full"
        >
          Browse Menu
        </button>
      </section>

      {/* TODAY SPECIAL */}
      {special && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Today's Special</h2>

          <div
            onClick={() => router.push("/menu")}
            className="bg-white rounded-3xl p-5 shadow-md cursor-pointer"
          >
            {special.images?.[0]?.url && (
              <Image
                src={special.images[0].url}
                alt={special.title}
                width={400}
                height={250}
                className="rounded-xl mb-3 object-cover"
              />
            )}

            <h3 className="font-semibold">{special.title}</h3>
            <p className="text-sm text-gray-600">
              {special.description}
            </p>

            {special.portionOptions?.[0] && (
              <p className="text-orange-600 font-bold mt-2">
                ₦{special.portionOptions[0].price}
              </p>
            )}
          </div>
        </section>
      )}

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Popular Dishes</h2>

          <div className="grid grid-cols-2 gap-4">
            {featured.map((food: any) => (
              <div
                key={food.id}
                className="bg-white rounded-2xl p-3 shadow-sm cursor-pointer"
                onClick={() => router.push("/menu")}
              >
                {food.images?.[0]?.url && (
                  <Image
                    src={food.images[0].url}
                    alt={food.title}
                    width={200}
                    height={150}
                    className="rounded-xl mb-2 object-cover"
                  />
                )}

                <p className="text-sm font-medium">
                  {food.title}
                </p>

                {food.portionOptions?.[0] && (
                  <p className="text-orange-600 text-sm font-semibold">
                    ₦{food.portionOptions[0].price}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

    </main>
  );
}