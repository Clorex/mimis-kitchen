"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Utensils, Star, ClipboardList, Store } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/menu", label: "Menu", icon: Utensils },
  { href: "/specials", label: "Specials", icon: Star },
  { href: "/orders", label: "Orders", icon: ClipboardList },
  { href: "/our-kitchen", label: "Our Kitchen", icon: Store },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-orange-100 shadow-lg z-50">
      <div className="flex justify-between items-center px-4 py-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center text-xs font-medium px-3 py-2 rounded-2xl transition ${
                isActive
                  ? "bg-orange-100 text-[#FF512F]"
                  : "text-gray-500"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

