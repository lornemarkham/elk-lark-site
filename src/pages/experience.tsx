import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import SiteHero from "../components/SiteHero";
import ExperienceCard from "../components/ExperienceCard";

/** Okanagan adventure hero — use adventure1.jpg if this reads too dark on your display. */
const EXPERIENCES_HERO_IMAGE = "/images/adventures/adventure2.jpg";

const FUNNEL_CARDS = [
  {
    title: "Wellness Retreats",
    description:
      "Reset, reconnect, or host something meaningful in a private Okanagan setting.",
    ctaLabel: "View Wellness Retreats",
    to: "/wellness-retreats",
  },
  {
    title: "Micro Weddings",
    description:
      "Small, relaxed celebrations with space for food, family, and a real sense of place.",
    ctaLabel: "View Micro Weddings",
    to: "/micro-weddings",
  },
  {
    title: "Group Getaways",
    description:
      "Pool days, BBQs, garage hangs, lake access, and weekends that turn into stories.",
    ctaLabel: "View Group Getaways",
    to: "/group-getaways",
  },
];

export default function Services() {
  return (
    <>
      {/* Each page MUST use a unique hero image — no shared or fallback images */}
      <SiteHero
        title="Choose Your Experience"
        subtitle="Pick your path based on how you want to stay, celebrate, or gather."
        backgroundImage={EXPERIENCES_HERO_IMAGE}
        overlayClassName="bg-black/20"
        backgroundAlt="Okanagan landscape near ELK Lark"
      />

      <section className="bg-white px-6 py-14 text-center text-gray-800">
        <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Three ways to start</h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Choose the path that fits your group — we’ll shape the details around it.
        </p>
      </section>

      <section className="bg-stone-50 px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3 md:items-stretch">
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

      <section className="border-t border-stone-200 bg-white px-6 pb-16 pt-12 text-center text-gray-800">
        <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Need something custom?</h2>
        <p className="mx-auto mb-6 max-w-2xl text-lg text-gray-600">
          {"Not sure which path fits? We'll help you design the right experience."}
        </p>
        <Link
          to="/guest-experiences"
          className="inline-block rounded-full bg-amber-600 px-8 py-3 font-semibold text-white transition hover:bg-amber-700"
        >
          Start Your Lark
        </Link>
      </section>

      <Footer />
    </>
  );
}
