"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Utensils, Star, ClipboardList, Store } from "lucide-react";

const navItems = [
  { href: "/", icon: Home },
  { href: "/menu", icon: Utensils },
  { href: "/specials", icon: Star },
  { href: "/orders", icon: ClipboardList },
  { href: "/our-kitchen", icon: Store },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t shadow-md z-50">
      <div className="flex justify-around items-center py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <Icon
                size={22}
                className={active ? "text-orange-500" : "text-gray-400"}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
