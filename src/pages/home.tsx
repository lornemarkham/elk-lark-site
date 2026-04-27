import React from "react";
import { Bike, Home as HomeIcon, Sprout, Truck, Waves, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import BasecampCarousel from "../components/BasecampCarousel";
import ExperienceCard from "../components/ExperienceCard";
import Footer from "../components/footer";
import SiteHero from "../components/SiteHero";

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
    description: "Intimate, relaxed, and anything but traditional",
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
  return (
    <>
      <SiteHero
        title="Experiences that actually feel like yours"
        subtitle="Wellness retreats, micro weddings, and group getaways — privately hosted in the Okanagan."
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

      <section className="border-t border-teal-200 bg-gradient-to-b from-white to-cyan-50 py-20 px-6 text-gray-800">
        <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2 items-start">
          <div className="overflow-hidden rounded-xl border border-stone-200 shadow-lg">
            <img
              src="/images/poolside-wedding-ai-concepts/image.png"
              alt="Poolside wedding ceremony in swimwear concept at ELK Lark"
              className="h-72 w-full object-cover md:h-80"
            />
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">New concept</p>
            <h2 className="mb-4 font-serif text-3xl md:text-4xl font-bold">Be our first poolside wedding</h2>
            <p className="text-lg text-gray-600">
              We haven’t hosted this one yet — but the space is real, the view is real, and the idea
              is very much on the table. Ceremony first, then food, music, drinks… people will end up
              in the pool.
            </p>
            <p className="mt-4 text-base font-semibold text-teal-800">
              First couple to make it happen gets a little extra love from us.
            </p>
            <div className="mt-8">
              <Link
                to="/micro-weddings"
                className="inline-block rounded-full bg-amber-600 px-8 py-3 font-semibold text-white transition hover:bg-amber-700"
              >
                See the micro wedding concept
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-6 text-center text-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-10 font-serif text-3xl md:text-4xl font-bold">Why ELK Lark feels different</h2>
          <div className="grid gap-6 md:grid-cols-2 text-left">
            <div className="rounded-xl border border-stone-200 bg-stone-50/80 p-6 shadow-sm">
              <p className="text-gray-700">Private property — not a public venue</p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50/80 p-6 shadow-sm">
              <p className="text-gray-700">Small group focus — no crowds, no chaos</p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50/80 p-6 shadow-sm">
              <p className="text-gray-700">Fully handled — from setup to flow</p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50/80 p-6 shadow-sm">
              <p className="text-gray-700">Built around you — not a fixed package</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-20 px-6 text-center text-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-10 font-serif text-3xl md:text-4xl font-bold">How it works</h2>
          <div className="grid gap-8 md:grid-cols-3 text-left">
            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-gray-800">1. Tell us what you want</h3>
              <p className="mt-3 text-gray-600">Share your idea, your group, and your vibe.</p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-gray-800">2. We shape the experience</h3>
              <p className="mt-3 text-gray-600">We plan and coordinate everything around you.</p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-gray-800">3. You show up and enjoy it</h3>
              <p className="mt-3 text-gray-600">We handle the details — you enjoy the day.</p>
            </div>
          </div>
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
