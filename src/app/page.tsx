"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChefHat, Zap, Wallet, Leaf, Plus, ShoppingCart } from "lucide-react";
import PremiumButton from "@/components/ui/PremiumButton";

export default function HomePage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="px-6 pt-6 pb-28 space-y-10"
    >

      {/* HERO */}
      <section className="space-y-4">
        <p className="text-sm text-orange-500">Welcome to Mimi's Kitchen</p>

        <h1 className="text-4xl font-bold leading-tight">
          What Are You <br />
          <span className="text-orange-500">Eating Today?</span>
        </h1>

        <p className="text-gray-600">
          Fresh. Homemade. Ready daily.
        </p>

        <PremiumButton className="flex items-center gap-2">
          Order Now <ArrowRight size={16} />
        </PremiumButton>
      </section>

      {/* TODAY SPECIAL */}
      <section className="space-y-4 relative">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Today's Special</h2>
          <span className="text-xs bg-red-500 text-white px-3 py-1 rounded-full">
            Limited
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-orange-200">

          <div className="h-44 bg-[#E6CFA7] rounded-2xl mb-4"></div>

          <h3 className="text-lg font-semibold">Jollof Rice</h3>
          <p className="text-sm text-gray-600 mb-3">
            Classic Nigerian party jollof with rich tomato base and smoky flavor
          </p>

          <div className="flex gap-2 mb-3">
            <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full">Small</span>
            <span className="text-xs bg-orange-200 text-orange-700 px-3 py-1 rounded-full">Big</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-[#C62828]">₦1,500</span>

            <button className="flex items-center gap-2 bg-gradient-to-r from-[#FF512F] to-[#F09819] text-white px-4 py-2 rounded-full shadow-md">
              <ShoppingCart size={16} /> Add
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="grid grid-cols-2 gap-4">
        <Feature icon={<ChefHat size={20} />} title="Homemade Meals" desc="Cooked with love" />
        <Feature icon={<Zap size={20} />} title="Fast Pickup" desc="Ready in 15 mins" />
        <Feature icon={<Wallet size={20} />} title="Affordable" desc="Great portions" />
        <Feature icon={<Leaf size={20} />} title="Fresh Daily" desc="Never frozen" />
      </section>

      {/* POPULAR DISHES */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Popular Dishes</h2>
          <span className="text-sm text-orange-500 cursor-pointer">
            See All →
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {["Jollof Rice", "Fried Rice", "Egusi Soup", "Special Combo"].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-3 shadow-sm">
              <div className="h-28 bg-[#E6CFA7] rounded-xl mb-2"></div>
              <p className="font-medium text-sm">{item}</p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm font-semibold text-orange-600">₦1,500</span>
                <button className="bg-orange-500 text-white w-7 h-7 flex items-center justify-center rounded-full">
                  <Plus size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white rounded-3xl p-6 text-center space-y-4 shadow-sm">
        <h3 className="text-lg font-semibold">Hungry?</h3>
        <p className="text-gray-600 text-sm">
          Place your order now and pick up in 15 minutes!
        </p>
        <div className="flex gap-3 justify-center">
          <PremiumButton>Browse Menu</PremiumButton>
          <button className="bg-orange-100 text-orange-600 px-5 py-3 rounded-full">
            WhatsApp
          </button>
        </div>
      </section>

    </motion.main>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
      <div className="bg-orange-500 text-white w-10 h-10 flex items-center justify-center rounded-full mx-auto mb-2">
        {icon}
      </div>
      <p className="font-medium text-sm">{title}</p>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  );
}


