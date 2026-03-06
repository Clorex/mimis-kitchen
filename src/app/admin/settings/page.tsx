"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function SettingsPage() {

  const [data, setData] = useState<any>({
    businessName: "",
    tagline: "",
    phone: "",
    whatsapp: "",
    instagram: "",
    email: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
    deliveryFee: 0,
    freeDeliveryMin: 0,
    pickupTime: "",
    deliveryTime: "",
    bannerText: "",
    bannerActive: false
  });

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, "settings", "main"));
      if (snap.exists()) setData(snap.data());
    };
    load();
  }, []);

  const save = async () => {
    await setDoc(doc(db, "settings", "main"), data);
    alert("Settings saved ✅");
  };

  return (
    <div className="max-w-md mx-auto space-y-6 pb-20">

      <h1 className="text-2xl font-bold">Business Settings</h1>

      <div className="bg-white p-6 rounded-2xl shadow space-y-4">

        <h2 className="text-sm font-semibold text-gray-400 uppercase">Business Info</h2>

        <input
          placeholder="Business Name"
          value={data.businessName}
          onChange={(e)=>setData({...data,businessName:e.target.value})}
          className="border p-3 rounded w-full"
        />

        <input
          placeholder="Tagline"
          value={data.tagline}
          onChange={(e)=>setData({...data,tagline:e.target.value})}
          className="border p-3 rounded w-full"
        />

        <input
          placeholder="Phone"
          value={data.phone}
          onChange={(e)=>setData({...data,phone:e.target.value})}
          className="border p-3 rounded w-full"
        />

        <input
          placeholder="WhatsApp Link"
          value={data.whatsapp}
          onChange={(e)=>setData({...data,whatsapp:e.target.value})}
          className="border p-3 rounded w-full"
        />

        <h2 className="text-sm font-semibold text-gray-400 uppercase pt-4">Bank Details</h2>

        <input
          placeholder="Bank Name"
          value={data.bankName}
          onChange={(e)=>setData({...data,bankName:e.target.value})}
          className="border p-3 rounded w-full"
        />

        <input
          placeholder="Account Number"
          value={data.accountNumber}
          onChange={(e)=>setData({...data,accountNumber:e.target.value})}
          className="border p-3 rounded w-full"
        />

        <input
          placeholder="Account Name"
          value={data.accountName}
          onChange={(e)=>setData({...data,accountName:e.target.value})}
          className="border p-3 rounded w-full"
        />

        <h2 className="text-sm font-semibold text-gray-400 uppercase pt-4">Delivery</h2>

        <input
          type="number"
          placeholder="Delivery Fee"
          value={data.deliveryFee}
          onChange={(e)=>setData({...data,deliveryFee:Number(e.target.value)})}
          className="border p-3 rounded w-full"
        />

        <input
          type="number"
          placeholder="Free Delivery Minimum"
          value={data.freeDeliveryMin}
          onChange={(e)=>setData({...data,freeDeliveryMin:Number(e.target.value)})}
          className="border p-3 rounded w-full"
        />

        <input
          placeholder="Pickup Time"
          value={data.pickupTime}
          onChange={(e)=>setData({...data,pickupTime:e.target.value})}
          className="border p-3 rounded w-full"
        />

        <input
          placeholder="Delivery Time"
          value={data.deliveryTime}
          onChange={(e)=>setData({...data,deliveryTime:e.target.value})}
          className="border p-3 rounded w-full"
        />

        <h2 className="text-sm font-semibold text-gray-400 uppercase pt-4">Homepage</h2>

        <input
          placeholder="Banner Text"
          value={data.bannerText}
          onChange={(e)=>setData({...data,bannerText:e.target.value})}
          className="border p-3 rounded w-full"
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={data.bannerActive}
            onChange={(e)=>setData({...data,bannerActive:e.target.checked})}
          />
          Enable Banner
        </label>

        <button
          onClick={save}
          className="bg-orange-500 text-white w-full py-3 rounded-xl font-semibold"
        >
          Save Settings
        </button>

      </div>
    </div>
  );
}
