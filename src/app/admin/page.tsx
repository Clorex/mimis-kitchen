"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import MenuManager from "@/components/admin/menu/MenuManager";
import OrderManager from "@/components/admin/OrderManager";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";

export default function AdminPage() {
  const [active, setActive] = useState("dashboard");

  const renderContent = () => {
    switch (active) {
      case "menu":
        return <MenuManager />;
      case "orders":
        return <OrderManager />;
      case "analytics":
        return <AnalyticsDashboard />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <>
      <Sidebar active={active} setActive={setActive} />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <div className="p-8 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </>
  );
}

function DashboardOverview() {
  return (
    <div className="grid grid-cols-4 gap-6">
      <StatCard title="Total Orders" value="--" />
      <StatCard title="Pending Orders" value="--" />
      <StatCard title="Revenue" value="--" />
      <StatCard title="Avg Order" value="--" />
    </div>
  );
}

function StatCard({ title, value }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
