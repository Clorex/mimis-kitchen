"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/lib/db";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = ["#FF512F", "#F09819", "#4CAF50", "#C62828", "#757575"];

export default function AnalyticsDashboard() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getOrders();
      setOrders(data);
    };
    load();
  }, []);

  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === "completed");
  const pendingOrders = orders.filter(o => o.status === "pending");

  const totalRevenue = completedOrders.reduce(
    (sum, o) => sum + (o.total || 0),
    0
  );

  const avgOrderValue =
    completedOrders.length > 0
      ? totalRevenue / completedOrders.length
      : 0;

  // Orders by status
  const statusCounts = ["pending", "confirmed", "ready", "completed", "cancelled"]
    .map(status => ({
      name: status,
      value: orders.filter(o => o.status === status).length,
    }))
    .filter(item => item.value > 0);

  // Revenue last 7 days
  const last7Days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayStr = date.toISOString().split("T")[0];

    const dailyRevenue = completedOrders
      .filter(o => o.createdAt?.startsWith(dayStr))
      .reduce((sum, o) => sum + (o.total || 0), 0);

    return {
      date: dayStr.slice(5),
      revenue: dailyRevenue,
    };
  }).reverse();

  // Top selling items
  const itemCounts: any = {};

  orders.forEach(order => {
    order.items?.forEach((item: any) => {
      itemCounts[item.title] =
        (itemCounts[item.title] || 0) + item.quantity;
    });
  });

  const topItems = Object.keys(itemCounts)
    .map(title => ({
      name: title,
      sold: itemCounts[title],
    }))
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5);

  return (
    <div className="space-y-10">

      <h2 className="text-2xl font-bold">Analytics Dashboard</h2>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Total Orders" value={totalOrders} />
        <StatCard label="Pending Orders" value={pendingOrders.length} />
        <StatCard label="Completed Orders" value={completedOrders.length} />
        <StatCard label="Revenue" value={`₦${totalRevenue.toLocaleString()}`} />
        <StatCard label="Avg Order" value={`₦${Math.round(avgOrderValue).toLocaleString()}`} />
      </div>

      {/* STATUS PIE */}
      <div className="bg-white p-6 rounded-3xl shadow-md h-80">
        <h3 className="font-semibold mb-4">Orders by Status</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={statusCounts} dataKey="value" nameKey="name" outerRadius={100}>
              {statusCounts.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* REVENUE BAR */}
      <div className="bg-white p-6 rounded-3xl shadow-md h-80">
        <h3 className="font-semibold mb-4">Revenue (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={last7Days}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#FF512F" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* TOP ITEMS */}
      <div className="bg-white p-6 rounded-3xl shadow-md">
        <h3 className="font-semibold mb-4">Top Selling Items</h3>
        <ul className="space-y-2">
          {topItems.map((item, index) => (
            <li key={index} className="flex justify-between text-sm">
              <span>{item.name}</span>
              <span className="font-semibold">{item.sold} sold</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

function StatCard({ label, value }: any) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
