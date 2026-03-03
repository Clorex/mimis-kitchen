"use client";

import { useState } from "react";
import MenuManager from "@/components/admin/menu/MenuManager";
import OrderManager from "@/components/admin/OrderManager";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";

export default function AdminLayout() {
  const [tab, setTab] = useState("menu");

  return (
    <div className="space-y-8">
      <div className="flex gap-4">
        {["menu", "orders", "analytics"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm ${
              tab === t
                ? "bg-orange-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {tab === "menu" && <MenuManager />}
      {tab === "orders" && <OrderManager />}
      {tab === "analytics" && <AnalyticsDashboard />}
    </div>
  );
}
