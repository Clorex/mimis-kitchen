"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/context/CartContext";
import { formatCurrency } from "@/lib/format";
import { useSettings } from "@/hooks/useSettings";

export default function CheckoutPage() {
  const { cart, getTotal, clearCart } = useCartContext();
  const router = useRouter();
  const settings = useSettings();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  if (!settings) return null;

  const deliveryFee = settings.deliveryFee || 0;
  const total = getTotal() + deliveryFee;

  return (
    <main className="px-5 pt-8 pb-28 space-y-6 max-w-md mx-auto">

      <h1 className="text-2xl font-bold">Checkout</h1>

      {/* CUSTOMER DETAILS */}
      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        <input
          placeholder="Your Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="border p-3 rounded w-full"
        />
        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          className="border p-3 rounded w-full"
        />
        <input
          placeholder="Delivery Address"
          value={address}
          onChange={(e)=>setAddress(e.target.value)}
          className="border p-3 rounded w-full"
        />
      </div>

      {/* PAYMENT INFO (DYNAMIC) */}
      <div className="bg-white p-4 rounded-xl shadow space-y-2">
        <h2 className="font-semibold">Bank Transfer</h2>
        <p><b>Bank:</b> {settings.bankName}</p>
        <p><b>Account Number:</b> {settings.accountNumber}</p>
        <p><b>Account Name:</b> {settings.accountName}</p>
      </div>

      {/* TOTAL */}
      <div className="bg-white p-4 rounded-xl shadow">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(getTotal())}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>{formatCurrency(deliveryFee)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <button
        onClick={()=>{
          clearCart();
          alert("Order placed ✅");
          router.push("/");
        }}
        className="bg-orange-500 text-white w-full py-3 rounded-xl font-semibold"
      >
        Place Order
      </button>

    </main>
  );
}
