"use client";

import { MapPin, Clock, Phone, Instagram } from "lucide-react";
import { BRAND } from "@/config/brand";

export default function Footer() {
  return (
    <footer className="bg-white rounded-t-3xl p-6 space-y-6 mt-8">
      <div className="text-center">
        <h3 className="text-xl font-bold text-orange-500">{BRAND.name}</h3>
        <p className="text-gray-500 text-sm">{BRAND.tagline}</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin size={20} className="text-orange-500 flex-shrink-0 mt-1" />
          <div>
            <p className="font-medium">Location</p>
            <p className="text-sm text-gray-600">{BRAND.location.full}</p>
            <a
              href={BRAND.location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 text-sm hover:underline"
            >
              Get Directions →
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock size={20} className="text-orange-500 flex-shrink-0 mt-1" />
          <div>
            <p className="font-medium">Hours</p>
            <p className="text-sm text-gray-600">
              {BRAND.hours.days}: {BRAND.hours.open} - {BRAND.hours.close}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone size={20} className="text-orange-500 flex-shrink-0 mt-1" />
          <div>
            <p className="font-medium">Contact</p>
            <p className="text-sm text-gray-600">{BRAND.contact.phone}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Instagram size={20} className="text-orange-500 flex-shrink-0 mt-1" />
          <div>
            <p className="font-medium">Follow Us</p>
            <a
              href={BRAND.socials.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-orange-500 hover:underline"
            >
              {BRAND.socials.instagram}
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 pt-4 border-t">
        © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
      </div>
    </footer>
  );
}
