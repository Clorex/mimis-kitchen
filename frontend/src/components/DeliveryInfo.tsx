"use client";

import { Truck, MapPin, Clock } from "lucide-react";
import { BRAND } from "@/config/brand";

export default function DeliveryInfo() {
  return (
    <section className="bg-white rounded-3xl p-5 space-y-4">
      <h2 className="text-lg font-bold">Pickup & Delivery</h2>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <MapPin size={18} className="text-orange-500" />
          </div>
          <div>
            <p className="font-medium">Pickup</p>
            <p className="text-sm text-gray-500">{BRAND.delivery.pickupTime}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <Truck size={18} className="text-orange-500" />
          </div>
          <div>
            <p className="font-medium">Delivery</p>
            <p className="text-sm text-gray-500">
              {BRAND.delivery.deliveryTime} ({BRAND.delivery.areas})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <Clock size={18} className="text-orange-500" />
          </div>
          <div>
            <p className="font-medium">Hours</p>
            <p className="text-sm text-gray-500">
              {BRAND.hours.open} - {BRAND.hours.close}
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400">
        * Delivery fee calculated at checkout
      </p>
    </section>
  );
}
