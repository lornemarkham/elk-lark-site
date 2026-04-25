import React from "react";
import { Bike, Home as HomeIcon, Sprout, Truck, Waves, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import BasecampCarousel from "../components/BasecampCarousel";
import ExperienceCard from "../components/ExperienceCard";
import Footer from "../components/footer";
import SiteHero from "../components/SiteHero";
import { useSeason } from "../state/SeasonContext";

const FUNNEL_CARDS = [
  {
    title: "Wellness Retreats",
    description: "Slow down, reset, and host something that matters",
    to: "/wellness-retreats",
    ctaLabel: "Explore wellness retreats",
    accentColor: "accent" as const,
  },
  {
    title: "Micro Weddings",
    description: "Intimate, relaxed, and fully taken care of — start to finish",
    to: "/micro-weddings",
    ctaLabel: "Explore micro weddings",
    accentColor: "restore" as const,
  },
  {
    title: "Group Getaways",
    description: "Friends, teams, and weekends that become stories",
    to: "/group-getaways",
    ctaLabel: "Explore group getaways",
    accentColor: "strategy" as const,
  },
];

export default function Home() {
  const { season } = useSeason();

  return (
    <>
      <SiteHero
        title={
          season === "winter"
            ? "Winter stays that feel intentional."
            : "Pick your path. We’ll host the rest."
        }
        subtitle={
          season === "winter"
            ? "Smaller groups and quieter energy on the property — trails, bonfires, and long conversations without the summer rush."
            : "Wellness retreats, micro weddings, and group getaways — privately hosted in the Okanagan."
        }
        overlayClassName="bg-black/30"
        backgroundImage="/images/pool/pool6.jpg"
        backgroundAlt="Pool at ELK Lark"
        ctaText="Start Your Lark"
        ctaLink="/guest-experiences"
        titleTestId="hero-title"
        subtitleTestId="hero-copy"
      />

      {/* Start with your kind of stay */}
      <section className="bg-white py-20 px-6 text-center text-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Start with your kind of stay</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
          Choose what you're planning — we’ll shape everything around it.
        </p>
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3 text-left">
          {FUNNEL_CARDS.map((card) => (
            <ExperienceCard
              key={card.to}
              title={card.title}
              description={card.description}
              ctaLabel={card.ctaLabel}
              ctaTo={card.to}
              accentColor={card.accentColor}
            />
          ))}
        </div>
      </section>

      {/* Basecamp */}
      <section className="bg-stone-100 py-20 px-6 text-center text-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Your private basecamp</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Pool, garage hangout, trails, and space to make it your own.
        </p>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <BasecampCarousel />
          <ul className="space-y-3 text-left text-gray-600">
            <li className="flex items-start gap-2">
              <Waves className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" aria-hidden />
              <span>Private pool with waterslide</span>
            </li>
            <li className="flex items-start gap-2">
              <Wrench className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" aria-hidden />
              <span>Garage hangout (TV, karaoke, darts)</span>
            </li>
            <li className="flex items-start gap-2">
              <Truck className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" aria-hidden />
              <span>Access to forest service roads</span>
            </li>
            <li className="flex items-start gap-2">
              <Bike className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" aria-hidden />
              <span>Paddleboards, bikes, seasonal gear</span>
            </li>
            <li className="flex items-start gap-2">
              <Sprout className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" aria-hidden />
              <span>Garden-to-table options (seasonal)</span>
            </li>
            <li className="flex items-start gap-2">
              <HomeIcon className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" aria-hidden />
              <span>Private base — not open to the public</span>
            </li>
          </ul>
        </div>

        <div className="mt-12">
          <Link
            to="/basecamp"
            className="inline-block bg-black text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition"
          >
            Explore the Basecamp
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
