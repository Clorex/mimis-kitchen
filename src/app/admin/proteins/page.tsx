"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { formatCurrency } from "@/lib/format";

export default function ProteinsPage() {
  const [proteins, setProteins] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "proteins"));
      setProteins(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Proteins</h1>
      <div className="space-y-4">
        {proteins.map(p => (
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <p className="font-bold">{p.name}</p>
            <p>{formatCurrency(p.price)}</p>
            <p className="text-xs">
              Stock: {p.stockQuantity || 0} | Available: {p.isAvailable ? "Yes" : "No"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
