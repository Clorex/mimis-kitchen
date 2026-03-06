"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { formatCurrency } from "@/lib/format";

export default function SpecialsPage() {
  const [specials, setSpecials] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "specials"));
      setSpecials(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Specials</h1>
      <div className="space-y-4">
        {specials.map(s => (
          <div key={s.id} className="bg-white p-4 rounded shadow">
            <p className="font-bold">{s.title}</p>
            <p>{formatCurrency(s.newPrice)} (Old: {formatCurrency(s.oldPrice)})</p>
            <p className="text-xs">
              Remaining: {s.quantityRemaining} | Active: {s.isActive ? "Yes" : "No"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
