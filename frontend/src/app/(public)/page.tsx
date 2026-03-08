"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useSettings } from "@/hooks/useSettings";
import { formatCurrency } from "@/lib/format";
import { Star } from "lucide-react";

export default function HomePage() {

  const settings = useSettings();
  const [meals, setMeals] = useState<any[]>([]);

  useEffect(()=>{
    const load = async ()=>{
      const snap = await getDocs(collection(db,"meals"));
      const data = snap.docs.map(d=>({ id:d.id, ...d.data() }));
      setMeals(data.filter(m=>!m.archived));
    };
    load();
  },[]);

  if(!settings) return null;

  const featuredMeals = meals.filter(m=>m.featureHomepage).slice(0,3);
  const signature = meals.find(m=>m.featureSpecials) || featuredMeals[0];

  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="bg-[#F4E8D7] px-6 pt-24 pb-28 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            Good Food. No Stress.
          </h1>

          <p className="text-gray-600 text-lg">
            Freshly prepared meals in Lekki, crafted daily with attention to taste and quality.
          </p>

          <button className="bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold shadow-md hover:bg-orange-600 transition">
            Order Now
          </button>
        </div>
      </section>

      {/* SIGNATURE */}
      {signature && (
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">

            <h2 className="text-2xl font-semibold">
              Signature Selection
            </h2>

            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

              {signature.images?.length ? (
                <img src={signature.images[0]} className="w-full h-96 object-cover"/>
              ) : (
                <div className="h-96 bg-gray-100"></div>
              )}

              <div className="p-10 space-y-4">
                <h3 className="text-2xl font-semibold">
                  {signature.name}
                </h3>

                <p className="text-gray-600 max-w-xl mx-auto">
                  {signature.description}
                </p>

                <p className="text-xl font-bold text-orange-600">
                  From {formatCurrency(signature.portions?.[0]?.price)}
                </p>
              </div>

            </div>

          </div>
        </section>
      )}

      {/* FEATURED */}
      <section className="bg-[#F9F6F1] py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-10">

          <h2 className="text-2xl font-semibold text-center">
            Curated For You
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {featuredMeals.map(meal=>(
              <div key={meal.id} className="bg-white rounded-2xl shadow-md overflow-hidden">

                {meal.images?.length ? (
                  <img src={meal.images[0]} className="w-full h-64 object-cover"/>
                ) : (
                  <div className="h-64 bg-gray-100"></div>
                )}

                <div className="p-6 space-y-2">
                  <h3 className="font-semibold text-lg">
                    {meal.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {meal.description}
                  </p>

                  <p className="font-semibold text-orange-600">
                    From {formatCurrency(meal.portions?.[0]?.price)}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}
