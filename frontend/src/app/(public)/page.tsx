"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useSettings } from "@/hooks/useSettings";
import { FirestoreDoc } from "@/lib/types/firestore";

type Meal = {
  name: string;
  description: string;
  category: string;
  portions: { name: string; weight: string; price: number }[];
  images?: string[];
  featureHomepage?: boolean;
  archived?: boolean;
};

export default function HomePage() {

  const settings = useSettings();
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

  if(!settings) return null;

  const featuredMeals = meals.filter(m=>m.featureHomepage);

  return (
    <main className="p-10">
      <h1>{settings.businessName}</h1>
      {featuredMeals.map(m=>(
        <div key={m.id}>{m.name}</div>
      ))}
    </main>
  );
}
