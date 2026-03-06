"use client";

import { useState } from "react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <section className="bg-orange-500 rounded-3xl p-6 text-center text-white">
        <h3 className="text-xl font-bold mb-2">You are In!</h3>
        <p>Check your email for your discount code.</p>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-3xl p-6 shadow-md">
      <h3 className="text-xl font-bold text-center mb-2">
        Get ₦500 Off Your First Order
      </h3>
      <p className="text-gray-600 text-center text-sm mb-4">
        Join our list and get a discount on your first meal.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
        >
          Claim Discount
        </button>
      </form>
    </section>
  );
}
