"use client";

import { motion } from "framer-motion";
import { Flame, Gift, Plus } from "lucide-react";

export default function SpecialsPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-6 pt-8 pb-28 space-y-10"
    >

      {/* HEADER */}
      <section className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md">
          <Flame size={16} />
          Special Offers
        </div>

        <h1 className="text-4xl font-bold">Mimi's Specials</h1>

        <p className="text-gray-600">
          Exclusive deals and signature dishes
        </p>
      </section>

      {/* TODAY SPECIAL CARD */}
      <section className="relative">
        <div className="absolute inset-0 rounded-3xl blur-2xl opacity-30 bg-red-400"></div>

        <div className="relative bg-white rounded-3xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.08)] space-y-5">

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 font-semibold text-lg">
              <Flame className="text-red-500" size={18} />
              Today’s Special
            </div>

            <span className="bg-red-500 text-white text-xs px-4 py-1 rounded-full">
              HOT
            </span>
          </div>

          <div className="relative rounded-3xl overflow-hidden h-52 bg-[#D6C1A0]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

            <div className="absolute bottom-5 left-5 text-white">
              <h2 className="text-3xl font-bold">Jollof Rice</h2>
              <p className="text-sm opacity-90">
                Classic Nigerian party jollof with rich tomato
                base and smoky flavor
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Starting from</p>
              <p className="text-3xl font-bold text-orange-600">₦1,500</p>
            </div>

            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-2xl text-lg font-semibold shadow-lg">
              Order Now
            </button>
          </div>
        </div>
      </section>

      {/* ALL SPECIALS */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <Gift className="text-orange-500" size={20} />
          All Specials
        </div>

        {[
          {
            name: "Spaghetti Bolognese",
            desc: "Al dente spaghetti with rich meat sauce and herbs",
            price: "₦2,000",
          },
          {
            name: "Special Combo",
            desc: "Rice + Protein + Drink - Our signature meal deal",
            price: "₦3,500",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex items-center gap-5"
          >
            <div className="w-28 h-28 rounded-2xl bg-[#E3CDA7] flex-shrink-0"></div>

            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
              <p className="text-xl font-bold text-orange-600">{item.price}</p>
            </div>

            <button className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center justify-center shadow-md">
              <Plus size={20} />
            </button>
          </div>
        ))}
      </section>

      {/* FOLLOW CTA */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 text-center text-white space-y-4 shadow-lg">
        <h3 className="text-2xl font-bold">Follow Us for Deals!</h3>
        <p className="opacity-90">
          Get notified about daily specials and exclusive offers
        </p>

        <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold text-lg shadow-md">
          Follow @MimisKitchen
        </button>
      </section>

    </motion.main>
  );
}
