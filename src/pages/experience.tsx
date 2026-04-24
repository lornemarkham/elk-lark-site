import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import SiteHero from "../components/SiteHero";
import ExperienceCard from "../components/ExperienceCard";

const FUNNEL_CARDS = [
  {
    title: "Wellness Retreats",
    description: "Relax, recharge, and reset in a private Okanagan setting.",
    ctaLabel: "View Wellness Retreats",
    to: "/wellness-retreats",
  },
  {
    title: "Micro Weddings",
    description: "Intimate, unforgettable celebrations tailored to your vision.",
    ctaLabel: "View Micro Weddings",
    to: "/micro-weddings",
  },
  {
    title: "Group Getaways",
    description: "Bring your people together for a curated Okanagan experience.",
    ctaLabel: "Plan Your Group Getaway",
    to: "/group-getaways",
  },
];

export default function Services() {
  return (
    <>
      <SiteHero
        title="Your Experience"
        backgroundImage="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
        backgroundAlt="Okanagan experience"
      />

      <section className="bg-white py-20 px-6 text-center text-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
          Three ways to shape your stay
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Start with the path that matches your group. Each option has its own details and next
          steps.
        </p>
      </section>

      <section className="bg-stone-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
          {FUNNEL_CARDS.map((card) => (
            <ExperienceCard
              key={card.to}
              title={card.title}
              description={card.description}
              ctaLabel={card.ctaLabel}
              ctaTo={card.to}
            />
          ))}
        </div>
      </section>

      <section className="bg-white py-20 px-6 text-center text-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Need something custom?</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10">
          {"Not sure which path fits? We'll help you design the right experience."}
        </p>
        <Link
          to="/guest-experiences"
          className="inline-block rounded-full bg-amber-600 px-8 py-3 font-semibold text-white hover:bg-amber-700 transition"
        >
          Plan Your Experience
        </Link>
      </section>

      <Footer />
    </>
  );
}
