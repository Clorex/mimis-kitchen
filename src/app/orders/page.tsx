"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function OrdersPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center text-center px-6 pb-28"
      style={{ minHeight: "calc(100vh - 120px)" }}
    >
      {/* Icon Circle */}
      <div className="w-32 h-32 rounded-full bg-[#EADBC8] flex items-center justify-center mb-8">
        <ShoppingBag size={42} className="text-orange-500" />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-[#2B2B2B] mb-4">
        Your cart is empty
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-[#6B7280] max-w-xs">
        Add some delicious meals to get started!
      </p>
    </motion.main>
  );
}
