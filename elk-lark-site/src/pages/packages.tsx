import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import PackageCard from "../components/PackageCard";

const PACKAGES = [
  {
    title: "Valley Escape",
    description:
      "A weekend built for small groups who want to unplug in the Okanagan. Pool, firepit, and local flavour — no itinerary, just good company and the valley at your doorstep.",
    whoItIsFor: "Couples or friends (2–6) looking for a relaxed getaway with optional add-ons.",
    highlights: [
      "Private pool and deck",
      "Firepit evenings",
      "Welcome basket with local treats",
      "Optional wine or cider tour add-on",
    ],
    ctaLabel: "Explore Valley Escape",
    ctaTo: "/guest-experiences",
    accentColor: "accent" as const,
  },
  {
    title: "Trail & Lake",
    description:
      "Adventure-forward days: forest roads, paddleboards, and lakeside hangs. We provide the gear and the spots; you bring the energy.",
    whoItIsFor: "Active groups and families who want a mix of adventure and downtime.",
    highlights: [
      "Guided or self-guided trail access",
      "Paddleboards and lake access",
      "Truck support for gear",
      "Pack lunch or BBQ option",
    ],
    ctaLabel: "Ride the Wild",
    ctaTo: "/guest-experiences",
    accentColor: "restore" as const,
  },
  {
    title: "Gather & Feast",
    description:
      "Backyard BBQs, poolside sessions, or a curated dinner under the stars. We handle the setup; you show up and enjoy.",
    whoItIsFor: "Celebrations, reunions, or anyone who wants a memorable meal in a one-of-a-kind setting.",
    highlights: [
      "Custom menu options",
      "Private outdoor dining",
      "Pool and yard access",
      "Optional bar or catering add-ons",
    ],
    ctaLabel: "Plan Your Feast",
    ctaTo: "/guest-experiences",
    accentColor: "brand" as const,
  },
  {
    title: "Think Tank",
    description:
      "Offsite that actually works. Private space, strong Wi-Fi, whiteboards, and the Okanagan as your backdrop. Strategy by day, firepit by night.",
    whoItIsFor: "Small teams and founders who want to think big without the hotel-ballroom vibe.",
    highlights: [
      "Dedicated work space",
      "Catering and refreshments",
      "Optional facilitation support",
      "Evening wind-down (firepit, optional activities)",
    ],
    ctaLabel: "Book Your Think Tank",
    ctaTo: "/guest-experiences",
    accentColor: "strategy" as const,
  },
];

export default function Packages() {
  return (
    <>
      {/* Mini Hero */}
      <section className="relative h-72 w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80"
          alt="Okanagan valley and mountains"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-4xl md:text-5xl font-bold font-serif text-center px-4">
            Curated Packages
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-14 px-6 text-center text-gray-800">
        <p className="text-xl max-w-3xl mx-auto font-light text-gray-600">
          Hand-picked experiences in the heart of the Okanagan. Each package is built to match a
          vibe — from slow valley escapes to full-throttle adventure and everything in between.
        </p>
      </section>

      {/* Packages Grid */}
      <section className="bg-stone-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
            Choose Your Lark
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {PACKAGES.map((pkg, i) => (
              <PackageCard key={i} {...pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 px-6 text-center">
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Need something custom? We curate experiences to match your group, your event, and your
          moment.
        </p>
        <Link
          to="/guest-experiences"
          className="inline-block bg-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-700 transition"
        >
          Start Your Lark →
        </Link>
      </section>

      <Footer />
    </>
  );
}
