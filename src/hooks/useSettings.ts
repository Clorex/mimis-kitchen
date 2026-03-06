"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function useSettings() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, "settings", "main"));
      if (snap.exists()) setSettings(snap.data());
    };
    load();
  }, []);

  return settings;
}
