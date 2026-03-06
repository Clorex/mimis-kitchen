"use client";

import { MapPin, Clock, Phone, Instagram, Heart, Utensils, Users } from "lucide-react";
import { BRAND } from "@/config/brand";
import FloatingCart from "@/components/cart/FloatingCart";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

export default function OurKitchenPage() {
  return (
    <>
      <FloatingCart />
      <WhatsAppButton />

      <main className="pb-28">
        {/* HERO */}
        <div className="bg-orange-500 px-5 pt-10 pb-8 text-white">
          <h1 className="text-3xl font-bold">Meet Mimi</h1>
          <p className="text-orange-100 mt-2">The heart behind every meal</p>
        </div>

        <div className="px-5 py-8 space-y-8">
          {/* MIMI'S STORY */}
          <section className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
            <div className="w-24 h-24 bg-[#E6CFA7] rounded-full mx-auto flex items-center justify-center text-4xl">
              👩🏾‍🍳
            </div>

            <h2 className="text-xl font-bold text-center">From Mimi's Kitchen to Your Table</h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Mimi started cooking for family and friends over 10 years ago. What began as weekend cook-outs 
                in Surulere grew into a passion that couldn't stay hidden.
              </p>
              <p>
                In 2020, Mimi's Kitchen officially opened in Lekki Phase 1. The mission was simple: 
                serve the kind of food you'd get at a Nigerian home — fresh, generous, and made with real love.
              </p>
              <p>
                Today, we serve hundreds of customers weekly. But the approach hasn't changed. 
                Every meal is prepared fresh daily. No frozen leftovers. No shortcuts.
              </p>
            </div>
          </section>

          {/* VALUES */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold">What We Stand For</h2>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white rounded-2xl p-5 shadow-sm flex gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Utensils size={20} className="text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Fresh Daily</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    We cook every morning. Nothing is frozen, reheated, or from yesterday.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm flex gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart size={20} className="text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Made With Love</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    We treat every order like we're cooking for family. Because food is personal.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm flex gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users size={20} className="text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Generous Portions</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    No one leaves hungry. We believe in value you can see and taste.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* LOCATION */}
          <section className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold">Visit Us</h2>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-gray-600">{BRAND.location.full}</p>
                  <a
                    href={BRAND.location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 text-sm hover:underline"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={20} className="text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Hours</p>
                  <p className="text-sm text-gray-600">
                    {BRAND.hours.days}<br />
                    {BRAND.hours.open} - {BRAND.hours.close}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={20} className="text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Contact</p>
                  <p className="text-sm text-gray-600">{BRAND.contact.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Instagram size={20} className="text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Follow Us</p>
                  <a
                    href={BRAND.socials.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-orange-500 hover:underline"
                  >
                    {BRAND.socials.instagram}
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-orange-50 rounded-2xl p-6 text-center space-y-4">
            <h2 className="text-xl font-bold">Hungry?</h2>
            <p className="text-gray-600">
              Experience Mimi's cooking for yourself. Order now and taste the difference.
            </p>
            <a
              href="/menu"
              className="inline-block bg-orange-500 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-orange-600 transition"
            >
              Order Now
            </a>
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
}
