"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Utensils, Star, ClipboardList, Store } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/menu", icon: Utensils, label: "Menu" },
  { href: "/specials", icon: Star, label: "Specials" },
  { href: "/orders", icon: ClipboardList, label: "Orders" },
  { href: "/our-kitchen", icon: Store, label: "About" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-white border-t shadow-lg z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center py-1 px-3"
            >
              <Icon
                size={20}
                className={active ? "text-orange-500" : "text-gray-400"}
              />
              <span
                className={`text-xs mt-1 ${
                  active ? "text-orange-500 font-medium" : "text-gray-400"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
