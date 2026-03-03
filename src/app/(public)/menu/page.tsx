"use client";

import { Search, Plus } from "lucide-react";
import { motion } from "framer-motion";

const categories = ["All", "Rice", "Pasta", "Soups", "Swallow"];

const dishes = [
  { name: "Jollof Rice", price: 1500 },
  { name: "Fried Rice", price: 1800 },
  { name: "Spaghetti Bolognese", price: 2000 },
  { name: "Egusi Soup", price: 2500 },
  { name: "Pounded Yam", price: 500 },
  { name: "Special Combo", price: 3500 },
];

export default function MenuPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-6 pt-6 pb-28 space-y-8"
    >
      <h1 className="text-3xl font-bold">Our Menu</h1>

      {/* SEARCH */}
      <div className="flex items-center gap-3 bg-[#FDFCF9] rounded-full px-5 py-4 shadow-sm">
        <Search size={18} className="text-gray-500" />
        <input
          placeholder="Search dishes..."
          className="bg-transparent outline-none w-full text-sm"
        />
      </div>

      {/* CATEGORY PILLS */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((cat, i) => (
          <button
            key={cat}
            className={`px-5 py-2 rounded-full text-sm whitespace-nowrap ${
              i === 0
                ? "bg-gradient-to-r from-[#FF512F] to-[#F09819] text-white"
                : "bg-[#FDFCF9] text-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-5">
        {dishes.map((dish, i) => (
          <div
            key={i}
            className="bg-[#FDFCF9] rounded-3xl p-4 shadow-[0_8px_20px_rgba(0,0,0,0.05)]"
          >
            <div className="bg-[#E6CFA7] rounded-2xl h-36 mb-4"></div>

            <p className="font-semibold text-sm">{dish.name}</p>

            <div className="flex justify-between items-center mt-2">
              <span className="text-orange-600 font-bold text-sm">
                ₦{dish.price.toLocaleString()}
              </span>

              <button className="bg-gradient-to-r from-[#FF512F] to-[#F09819] text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md">
                <Plus size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.main>
  );
}


