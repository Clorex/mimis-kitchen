"use client";

import { MessageCircle } from "lucide-react";
import { BRAND } from "@/config/brand";

export default function WhatsAppButton() {
  return (
    <a
      href={BRAND.contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 bg-green-500 text-white p-3 rounded-full shadow-xl z-40 hover:bg-green-600 transition"
    >
      <MessageCircle size={24} />
    </a>
  );
}
