"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user && pathname !== "/admin/login") {
        router.push("/admin/login");
      }
      if (user && pathname === "/admin/login") {
        router.push("/admin");
      }
    });

    return () => unsub();
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h1 className="text-xl font-bold text-orange-500">Mimi Admin</h1>

        <nav className="space-y-2">
          <Link href="/admin">Dashboard</Link><br />
          <Link href="/admin/orders">Orders</Link><br />
          <Link href="/admin/meals">Meals</Link><br />
          <Link href="/admin/proteins">Proteins</Link><br />
          <Link href="/admin/specials">Specials</Link><br />
          <Link href="/admin/settings">Settings</Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
