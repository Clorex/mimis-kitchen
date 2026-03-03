"use client";

import { useState } from "react";
import MenuManager from "@/components/admin/menu/MenuManager";
import OrderManager from "@/components/admin/OrderManager";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";

export default function AdminPage() {
  const [tab, setTab] = useState("dashboard");

  const renderContent = () => {
    switch (tab) {
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
    <div className="min-h-screen bg-[#FCECEF] flex justify-center">
      <div className="w-full max-w-[430px] bg-white rounded-[32px] shadow-lg overflow-hidden">

        {/* Header */}
        <div className="p-6 border-b text-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>

          {/* Dropdown Tabs */}
          <select
            value={tab}
            onChange={(e) => setTab(e.target.value)}
            className="mt-4 w-full p-3 border rounded-lg"
          >
            <option value="dashboard">Dashboard</option>
            <option value="menu">Menu</option>
            <option value="orders">Orders</option>
            <option value="analytics">Analytics</option>
          </select>
        </div>

        {/* Content */}
        <div className="p-6 pb-24 overflow-y-auto">
          {renderContent()}
        </div>

      </div>
    </div>
  );
}

function DashboardOverview() {
  return (
    <div className="space-y-4">
      <StatCard title="Total Orders" value="--" />
      <StatCard title="Revenue" value="--" />
      <StatCard title="Pending Orders" value="--" />
    </div>
  );
}

function StatCard({ title, value }: any) {
  return (
    <div className="bg-[#F7EEE2] p-4 rounded-xl">
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-xl font-bold mt-1">{value}</p>
    </div>
  );
}
