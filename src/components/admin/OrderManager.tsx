"use client";

import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "@/lib/db";

export default function OrderManager() {
  const [orders, setOrders] = useState<any[]>([]); const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const loadOrders = async () => { setLoading(true);
    const data = await getOrders();
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter(order => order.status === filter);

  const changeStatus = async (id: string, status: string) => {
    await updateOrderStatus(id, status);
    loadOrders();
  };

  const totalRevenue = orders
    .filter(o => o.status === "completed")
    .reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Orders</h2>
        <div className="text-sm font-semibold text-orange-600">
          Revenue: ₦{totalRevenue.toLocaleString()}
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3">
        {["all", "pending", "confirmed", "ready", "completed", "cancelled"].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1 rounded-full text-xs ${
              filter === status
                ? "bg-orange-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* ORDER LIST */}
      <div className="space-y-6">
        {filteredOrders.map(order => (
          <div key={order.id} className="bg-white p-6 rounded-3xl shadow-md space-y-4">

            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Order #{order.id.slice(0,6)}</h3>
              <span className="text-sm capitalize text-gray-500">
                {order.status}
              </span>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Name:</strong> {order.customerName}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Total:</strong> ₦{order.total?.toLocaleString()}</p>
            </div>

            {/* ITEMS */}
            <div className="text-sm">
              <strong>Items:</strong>
              <ul className="list-disc ml-6">
                {order.items?.map((item:any, i:number) => (
                  <li key={i}>
                    {item.title} ({item.portion}) x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>

            {/* PAYMENT PROOF */}
            {order.paymentProof && (
              <img
                src={order.paymentProof}
                alt="Payment Proof"
                className="rounded-xl max-h-48 object-cover"
              />
            )}

            {/* STATUS BUTTONS */}
            <div className="flex gap-2 flex-wrap text-xs">
              {["confirmed", "ready", "completed", "cancelled"].map(status => (
                <button
                  key={status}
                  onClick={() => changeStatus(order.id, status)}
                  className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full"
                >
                  {status}
                </button>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}


