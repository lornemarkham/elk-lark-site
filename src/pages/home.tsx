import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeroBackground from "../components/HeroBackground";
import BasecampCarousel from "../components/BasecampCarousel";
import Footer from "../components/Footer";

export default function Home() {
  const [hoverTarget, setHoverTarget] = useState("");

  let leaveTimeout: NodeJS.Timeout;

  const handleMouseEnter = (target: string) => {
    clearTimeout(leaveTimeout);
    setHoverTarget(target);
  };

  const handleMouseLeave = () => {
    leaveTimeout = setTimeout(() => {
      setHoverTarget("");
    }, 2000);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-screen text-white overflow-hidden">
        <HeroBackground hoverTarget={hoverTarget} />
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Logo top-center */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 pt-12">
          <img
            src={
              typeof window !== "undefined" && window.innerWidth >= 640
                ? hoverTarget === "outlaw"
                  ? "/logo-outlaw.png"
                  : hoverTarget === "restore"
                  ? "/logo-restore.png"
                  : hoverTarget === "strategy"
                  ? "/logo-strategy.png"
                  : "/logo-white.png"
                : "/logo-white.png"
            }
            alt="ELK Lark Logo"
            className="h-32 sm:h-40 md:h-48 lg:h-56 transition-all duration-300"
          />
        </div>

        {/* Main CTA */}
        <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4 sm:px-6 lg:px-8">
          {/* Tagline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 font-serif leading-snug">
            Escape Ordinary. Live the Lark.
          </h1>

          {/* Description */}
          <p className="text-base sm:text-xl max-w-md sm:max-w-2xl mb-8 font-sans">
            Crafted by three generations, ELK Lark delivers epic, hand-curated experiences in the
            heart of the Okanagan. Adventure harder. Recharge deeper. Strategize smarter.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 font-sans w-full sm:w-auto max-w-xs sm:max-w-none"
            onMouseLeave={handleMouseLeave}
          >
            <Link
              to="/experiences/outlaw"
              onMouseEnter={() => handleMouseEnter("outlaw")}
              className="bg-restore hover:bg-restore px-6 py-3 rounded text-lg font-semibold text-center"
            >
              Outlaw Lark
            </Link>

            <Link
              to="/experiences/restore"
              onMouseEnter={() => handleMouseEnter("restore")}
              className="bg-accent hover:bg-secondary px-6 py-3 rounded text-lg font-semibold text-center"
            >
              Restore Lark
            </Link>

            <Link
              to="/experiences/strategy"
              onMouseEnter={() => handleMouseEnter("strategy")}
              className="bg-strategy hover:bg-strategy px-6 py-3 rounded text-lg font-semibold text-center"
            >
              Strategy Lark
            </Link>
          </div>
        </div>
      </div>

      {/* Why We Built ELK Lark */}
      <section className="bg-white py-20 px-6 text-center text-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Why We Built ELK Lark
        </h2>
        <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-3 text-left">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">🌲 Cross-Generational Roots</h3>
            <p className="text-gray-600">
              ELK Lark was born from three generations — Ember, Lorne, and Kathy — crafting something worth sharing: the soul of the Okanagan.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">🔥 Experiences, Not Itineraries</h3>
            <p className="text-gray-600">
              This isn’t a tour. It’s a vibe. We host moments, not minutes. You come to live, not check boxes.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">🛠️ Private. Unlisted. Unfiltered.</h3>
            <p className="text-gray-600">
              No corporate packages. No busloads of strangers. Just access to something real — and rare.
            </p>
          </div>
        </div>
      </section>

      {/* Your Private Basecamp */}
      <section className="bg-stone-100 py-20 px-6 text-center text-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">Your Private Basecamp</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Carousel */}
          <BasecampCarousel />

          {/* Details */}
          <ul className="space-y-3 text-left text-gray-600">
            <li>🏖️ Huge private pool with a waterslide</li>
            <li>🔧 Fully equipped garage hangout (TV, karaoke, fridge, darts)</li>
            <li>🛻 Access to forest service roads in a rugged truck</li>
            <li>🏍️ Dirt bike, paddleboards, and seasonal gear</li>
            <li>🌱 Seasonal garden-to-table tastings (when the harvest is right)</li>
            <li>🛏️ Home base for your crew — not open to the public</li>
          </ul>
        </div>

        {/* CTA Button */}
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
