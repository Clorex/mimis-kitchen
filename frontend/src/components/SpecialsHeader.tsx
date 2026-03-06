"use client";

import { Flame, Calendar, Package } from "lucide-react";

export default function SpecialsHeader() {
  return (
    <div className="flex items-center gap-3">
      <Flame className="text-orange-500" />
      <h2 className="text-lg font-semibold">Today's Specials</h2>
    </div>
  );
}
