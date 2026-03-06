"use client";

import Link from "next/link";

export default function AboutMimi() {
  return (
    <section className="bg-orange-50 rounded-3xl p-6 space-y-4">
      <h2 className="text-xl font-bold">From Mimi's Kitchen to Your Table</h2>

      <p className="text-gray-600 leading-relaxed">
        Mimi has spent years perfecting the meals Lagos loves most. Every plate
        is prepared fresh daily, with attention to taste, portion, and quality.
      </p>

      <Link
        href="/our-kitchen"
        className="inline-block text-orange-500 font-semibold hover:underline"
      >
        Meet Mimi →
      </Link>
    </section>
  );
}
