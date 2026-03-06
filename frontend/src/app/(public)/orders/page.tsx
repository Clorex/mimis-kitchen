"use client";

import { useState } from "react";
import { Package, Clock, CheckCircle, XCircle, ChevronRight } from "lucide-react";
import { formatCurrency } from "@/lib/format";

// Sample orders - in production, fetch from database
const sampleOrders = [
  {
    id: "MK-2024-001",
    date: "Today, 2:30 PM",
    status: "Ready",
    items: [
      { title: "Jollof Rice", portion: "Big (1kg)", quantity: 1 },
      { title: "Peppered Chicken", portion: "2 Pieces", quantity: 2 },
    ],
    total: 5800,
  },
  {
    id: "MK-2024-002",
    date: "Yesterday",
    status: "Completed",
    items: [
      { title: "Fried Rice", portion: "Small (500g)", quantity: 2 },
      { title: "Plantain", portion: "6 Pieces", quantity: 1 },
    ],
    total: 4200,
  },
  {
    id: "MK-2024-003",
    date: "Dec 15, 2024",
    status: "Completed",
    items: [
      { title: "Egusi Soup", portion: "Big (800ml)", quantity: 1 },
      { title: "Pounded Yam", portion: "2 Wraps", quantity: 1 },
    ],
    total: 5500,
  },
];

const statusConfig = {
  Pending: { color: "bg-yellow-100 text-yellow-700", icon: Clock },
  Confirmed: { color: "bg-blue-100 text-blue-700", icon: Clock },
  Ready: { color: "bg-green-100 text-green-700", icon: CheckCircle },
  Completed: { color: "bg-gray-100 text-gray-600", icon: CheckCircle },
  Cancelled: { color: "bg-red-100 text-red-700", icon: XCircle },
};

export default function OrdersPage() {
  const [orders] = useState(sampleOrders);

  return (
    <main className="px-5 pt-8 pb-28 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Your Orders</h1>
        <p className="text-gray-600 text-sm mt-1">Track and view your order history</p>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Package size={64} className="text-gray-300 mb-4" />
          <h2 className="text-lg font-semibold mb-2">No orders yet</h2>
          <p className="text-gray-500 text-sm mb-6">Your order history will appear here</p>
          <a
            href="/menu"
            className="bg-orange-500 text-white px-6 py-3 rounded-2xl font-semibold"
          >
            Browse Menu
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const StatusIcon = statusConfig[order.status as keyof typeof statusConfig]?.icon || Clock;
            const statusColor = statusConfig[order.status as keyof typeof statusConfig]?.color || "bg-gray-100";

            return (
              <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                  <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                    <StatusIcon size={12} />
                    {order.status}
                  </span>
                </div>

                <div className="border-t pt-3 space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.quantity}x {item.title} ({item.portion})
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t">
                  <span className="font-bold text-orange-600">{formatCurrency(order.total)}</span>
                  <button className="flex items-center gap-1 text-sm text-orange-500 font-medium">
                    View Details <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
