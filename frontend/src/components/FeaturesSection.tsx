"use client";

import { Leaf, Clock, Package, ShieldCheck } from "lucide-react";

const features = [
  { icon: Leaf, title: "Fresh Daily", desc: "Never frozen" },
  { icon: Clock, title: "Fast Pickup", desc: "Ready in 15 mins" },
  { icon: Package, title: "Clean Packaging", desc: "Sealed & safe" },
  { icon: ShieldCheck, title: "Quality Ingredients", desc: "Always fresh" },
];

export default function FeaturesSection() {
  return (
    <section className="grid grid-cols-2 gap-3">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white/80 rounded-2xl p-4 flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
            <feature.icon size={18} className="text-orange-500" />
          </div>
          <div>
            <p className="font-semibold text-sm">{feature.title}</p>
            <p className="text-xs text-gray-500">{feature.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
