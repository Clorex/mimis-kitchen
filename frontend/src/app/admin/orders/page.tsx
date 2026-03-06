"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { formatCurrency } from "@/lib/format";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    const snapshot = await getDocs(collection(db, "orders"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setOrders(
      data.sort(
        (a: any, b: any) =>
          b.createdAt?.seconds - a.createdAt?.seconds
      )
    );

    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const confirmPayment = async (order: any) => {
    await updateDoc(doc(db, "orders", order.id), {
      paymentStatus: "payment_confirmed",
      orderStatus: "confirmed",
      updatedAt: Timestamp.now(),
    });

    loadOrders();
  };

  const rejectPayment = async (order: any) => {
    const note = prompt("Reason for rejection?");
    if (!note) return;

    await updateDoc(doc(db, "orders", order.id), {
      paymentStatus: "rejected",
      adminNote: note,
      updatedAt: Timestamp.now(),
    });

    loadOrders();
  };

  const updateOrderStatus = async (order: any, status: string) => {
    await updateDoc(doc(db, "orders", order.id), {
      orderStatus: status,
      updatedAt: Timestamp.now(),
    });

    loadOrders();
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      {orders.length === 0 && <p>No orders yet.</p>}

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-6 rounded-xl shadow space-y-4"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-bold">{order.orderNumber}</p>
                <p className="text-sm text-gray-500">
                  {order.customerName} • {order.customerPhone}
                </p>
              </div>

              <p className="font-bold text-orange-600">
                {formatCurrency(order.totalAmount)}
              </p>
            </div>

            <div className="flex gap-6 text-sm">
              <span>
                Payment: <b>{order.paymentStatus}</b>
              </span>
              <span>
                Order: <b>{order.orderStatus}</b>
              </span>
            </div>

            {order.paymentStatus === "payment_uploaded" && (
              <div className="flex gap-3">
                <button
                  onClick={() => confirmPayment(order)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Confirm Payment
                </button>

                <button
                  onClick={() => rejectPayment(order)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
              </div>
            )}

            {order.paymentStatus === "payment_confirmed" && (
              <div className="flex gap-3">
                <button
                  onClick={() => updateOrderStatus(order, "preparing")}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Preparing
                </button>

                <button
                  onClick={() => updateOrderStatus(order, "ready")}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Ready
                </button>

                <button
                  onClick={() => updateOrderStatus(order, "completed")}
                  className="bg-gray-800 text-white px-4 py-2 rounded"
                >
                  Completed
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
