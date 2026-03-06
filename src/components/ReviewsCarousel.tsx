"use client";

import { Star } from "lucide-react";

const reviews = [
  {
    id: "1",
    name: "Verified Customer",
    location: "Lekki",
    rating: 5,
    text: "The food is consistently fresh and beautifully packaged. Delivery is always on time."
  },
  {
    id: "2",
    name: "Returning Customer",
    location: "Victoria Island",
    rating: 5,
    text: "Generous portions and excellent taste. Easily one of the best kitchens in Lekki."
  }
];

export default function ReviewsCarousel() {
  return (
    <section className="space-y-6 text-center max-w-3xl mx-auto">

      <h2 className="text-2xl font-semibold">
        Trusted by Customers Across Lekki
      </h2>

      <div className="space-y-8">
        {reviews.map(review => (
          <div key={review.id} className="space-y-3">

            <div className="flex justify-center gap-1">
              {[...Array(review.rating)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="fill-orange-500 text-orange-500"
                />
              ))}
            </div>

            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              "{review.text}"
            </p>

            <p className="text-sm text-gray-500">
              {review.name} · {review.location}
            </p>

          </div>
        ))}
      </div>

    </section>
  );
}
