"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { formatCurrency } from "@/lib/format";

export default function SpecialsPage() {

  const [specialMeals, setSpecialMeals] = useState<any[]>([]);

  useEffect(()=>{
    const load = async ()=>{
      const snap = await getDocs(collection(db,"meals"));
      const data = snap.docs.map(d=>({
        id: d.id,
        ...(d.data() as any)
      }));

      setSpecialMeals(data.filter(m=>m.featureSpecials && !m.archived));
    };
    load();
  },[]);

  return (
    <main className="px-6 pt-16 pb-28 max-w-5xl mx-auto space-y-10">

      <h1 className="text-3xl font-semibold">Today's Specials</h1>

      {specialMeals.length === 0 && (
        <p className="text-gray-500">No active specials.</p>
      )}

      <div className="grid md:grid-cols-2 gap-10">
        {specialMeals.map(meal=>(
          <div key={meal.id} className="bg-white rounded-2xl shadow-md overflow-hidden">

            {meal.images?.length ? (
              <img src={meal.images[0]} className="w-full h-64 object-cover"/>
            ) : (
              <div className="h-64 bg-gray-100"></div>
            )}

            <div className="p-6 space-y-2">
              <h2 className="font-semibold text-lg">{meal.name}</h2>
              <p className="text-gray-500 text-sm">{meal.description}</p>
              <p className="font-semibold text-orange-600">
                From {formatCurrency(meal.portions?.[0]?.price)}
              </p>
            </div>

          </div>
        ))}
      </div>

    </main>
  );
}
