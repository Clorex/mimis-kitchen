"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function CustomersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "orders"));
      setOrders(snap.docs.map(d => d.data()));
    };
    load();
  }, []);

  const uniqueCustomers = Array.from(
    new Map(orders.map(o => [o.customerPhone, o])).values()
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Customers</h1>
      <div className="space-y-4">
        {uniqueCustomers.map((c:any,i)=>(
          <div key={i} className="bg-white p-4 rounded shadow">
            <p className="font-bold">{c.customerName}</p>
            <p className="text-sm">{c.customerPhone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
