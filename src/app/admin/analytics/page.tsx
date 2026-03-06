"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { formatCurrency } from "@/lib/format";

export default function AnalyticsPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "orders"));
      setOrders(snap.docs.map(d => d.data()));
    };
    load();
  }, []);

  const revenue = orders
    .filter(o => o.paymentStatus === "payment_confirmed")
    .reduce((sum,o)=>sum+o.totalAmount,0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      <div className="bg-white p-6 rounded shadow">
        <p className="text-lg font-bold">Total Revenue</p>
        <p className="text-2xl text-orange-600">{formatCurrency(revenue)}</p>
        <p className="text-sm mt-2">Total Orders: {orders.length}</p>
      </div>
    </div>
  );
}
