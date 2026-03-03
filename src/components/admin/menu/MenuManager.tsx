"use client";

import AddFoodForm from "@/components/admin/menu/ProAddFoodForm";
import FoodTable from "@/components/admin/menu/FoodTable";

export default function MenuManager() {
  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-bold">Menu Management</h2>

      <AddFoodForm />

      <FoodTable />
    </div>
  );
}
