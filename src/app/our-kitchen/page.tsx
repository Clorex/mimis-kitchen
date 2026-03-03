"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Shield, Clock, MapPin, Phone, Instagram, MessageCircle } from "lucide-react";

export default function OurKitchenPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-28"
    >

      {/* HERO */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-14 px-6 relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
          <Heart size={28} />
        </div>

        <h1 className="text-4xl font-bold mb-3">Our Kitchen</h1>
        <p className="text-lg opacity-90">Where The Magic Happens</p>
      </section>

      <div className="px-6 space-y-10 mt-10">

        {/* STORY */}
        <section className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] space-y-4">
          <div className="flex items-center gap-3 text-xl font-semibold">
            <Sparkles className="text-orange-500" size={20} />
            Our Story
          </div>

          <p className="text-gray-600 leading-relaxed">
            Mimi's Kitchen started with a simple dream: to share the warmth of
            home-cooked Nigerian meals with everyone. What began as cooking
            for family and friends has grown into a kitchen that serves
            hundreds of happy customers daily.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Every dish we prepare carries the love, tradition, and authentic
            flavors that make Nigerian cuisine so special. From our signature
            jollof rice to our comforting soups, we put our heart into every meal.
          </p>
        </section>

        {/* PROMISE */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Our Promise</h2>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 text-center shadow-[0_8px_25px_rgba(0,0,0,0.05)] space-y-3">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <Shield size={24} />
              </div>
              <h3 className="font-semibold text-lg">Hygiene First</h3>
              <p className="text-sm text-gray-500">
                Clean kitchen, safe food always
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 text-center shadow-[0_8px_25px_rgba(0,0,0,0.05)] space-y-3">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto">
                <Clock size={24} />
              </div>
              <h3 className="font-semibold text-lg">Fresh Daily</h3>
              <p className="text-sm text-gray-500">
                Never frozen, always fresh
              </p>
            </div>
          </div>
        </section>

        {/* GET IN TOUCH */}
        <section className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] space-y-6">
          <h2 className="text-2xl font-bold">Get In Touch</h2>

          <div className="space-y-6">

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-semibold">Pickup Location</h4>
                <p className="text-gray-500 text-sm">
                  123 Food Street, Lekki Phase 1
                  <br />
                  Lagos, Nigeria
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                <Clock size={20} />
              </div>
              <div>
                <h4 className="font-semibold">Opening Hours</h4>
                <p className="text-gray-500 text-sm">
                  Mon - Sat: 8:00 AM - 8:00 PM
                  <br />
                  Sunday: 12:00 PM - 6:00 PM
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="font-semibold">Contact</h4>
                <p className="text-gray-500 text-sm">
                  +234 801 234 5678
                  <br />
                  hello@mimiskitchen.com
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* FOLLOW */}
        <section className="space-y-6 pb-6">
          <h2 className="text-2xl font-bold">Follow Us</h2>

          <div className="grid grid-cols-2 gap-6">
            <button className="bg-white rounded-2xl py-4 flex items-center justify-center gap-3 shadow-sm">
              <Instagram size={20} />
              Instagram
            </button>

            <button className="bg-white rounded-2xl py-4 flex items-center justify-center gap-3 shadow-sm">
              <MessageCircle size={20} />
              WhatsApp
            </button>
          </div>
        </section>

      </div>
    </motion.main>
  );
}
