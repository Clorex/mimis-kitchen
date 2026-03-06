"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FirestoreDoc } from "@/lib/types/firestore";

type Meal = {
  name: string;
  description: string;
  category: string;
  portions: { name: string; weight: string; price: number }[];
  images?: string[];
  archived?: boolean;
};

export default function MenuPage() {

  const [meals, setMeals] = useState<FirestoreDoc<Meal>[]>([]);

  useEffect(()=>{
    const load = async ()=>{
      const snap = await getDocs(collection(db,"meals"));
      const data: FirestoreDoc<Meal>[] = snap.docs.map(d=>({
        id: d.id,
        ...(d.data() as Meal)
      }));
      setMeals(data.filter(m=>!m.archived));
    };
    load();
  },[]);

  return (
    <main className="p-10">
      {meals.map(m=>(
        <div key={m.id}>{m.name}</div>
      ))}
    </main>
  );
}
