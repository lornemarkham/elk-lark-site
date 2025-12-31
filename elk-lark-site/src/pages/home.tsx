import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import HeroBackground from "../components/HeroBackground";
import WinterHeroCarousel from "../components/WinterHeroCarousel";
import BasecampCarousel from "../components/BasecampCarousel";
import Footer from "../components/footer";
import { useSeason } from "../state/SeasonContext";

export default function Home() {
  const [hoverTarget, setHoverTarget] = useState("");
  const { season } = useSeason();

  const leaveTimeout = useRef<number | null>(null);

  const handleMouseEnter = (target: string) => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
      leaveTimeout.current = null;
    }
    setHoverTarget(target);
  };

  const handleMouseLeave = () => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    leaveTimeout.current = window.setTimeout(() => {
      setHoverTarget("");
      leaveTimeout.current = null;
    }, 2000);
  };

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative text-white overflow-hidden"
        style={{ minHeight: "calc(100vh - 60px)" }}
      >
        {season === "winter" ? (
          <WinterHeroCarousel />
        ) : (
          <HeroBackground hoverTarget={hoverTarget} />
        )}

        {/* overlay: keep for summer but hide during winter so hero shows through */}
        {season !== "winter" && (
          <div
            className={`absolute inset-0 z-10 bg-black/50`}
          />
        )}

        {/* Logo / Slogan top-center (hidden in winter) */}
        {season !== "winter" && (
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
        )}


  {/* Main CTA - absolutely centered so content stays centered even when hero height is adjusted */}
  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          {/* Tagline */}
          <h1
            className={`text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 font-serif leading-snug ${
              season === "winter" ? "text-black" : "text-white"
            } ${season === "winter" ? "bg-white/30 px-3 py-1 rounded inline-block" : ""}`}
            data-testid="hero-title"
          >
            {season === "winter"
              ? "When the Valley Slows Down, ELK Lark Turns On."
              : "Escape Ordinary. Live the Lark. Summer Awaits."}
          </h1>

          <p
            className={`text-base sm:text-xl max-w-md sm:max-w-2xl mb-8 font-sans ${
              season === "winter" ? "text-black" : "text-white"
            } ${season === "winter" ? "bg-white/30 px-3 py-2 rounded inline-block leading-[1.4]" : ""}`}
            data-testid="hero-copy"
          >
            {season === "winter"
              ? "Winter at ELK Lark isn't about escaping the cold — it's about leaning into it. Bonfires instead of beach days. Snowy trails, late-night garage hangs, and slow mornings that turn into long conversations. This is the season for smaller groups, quieter energy, and experiences that don't exist on a booking site."
              : " Crafted by three generations, ELK Lark delivers epic, hand-curated experiences in the heart of the Okanagan. Adventure harder. Recharge deeper. Strategize smarter.   "}
          </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 font-sans w-full sm:w-auto max-w-xs sm:max-w-none"
          onMouseLeave={season === "winter" ? undefined : handleMouseLeave}
        >
          <Link
            to="/experiences/outlaw"
            onMouseEnter={season === "winter" ? undefined : () => handleMouseEnter("outlaw")}
            className={`bg-restore hover:bg-restore px-6 py-3 rounded text-lg font-semibold text-center ${
              season === "winter" ? "text-white" : ""
            }`}
          >
            Outlaw Lark
          </Link>

          <Link
            to="/experiences/restore"
            onMouseEnter={season === "winter" ? undefined : () => handleMouseEnter("restore")}
            className={`bg-accent hover:bg-secondary px-6 py-3 rounded text-lg font-semibold text-center ${
              season === "winter" ? "text-white" : ""
            }`}
          >
            Restore Lark
          </Link>

          <Link
            to="/experiences/strategy"
            onMouseEnter={season === "winter" ? undefined : () => handleMouseEnter("strategy")}
            className={`bg-strategy hover:bg-strategy px-6 py-3 rounded text-lg font-semibold text-center ${
              season === "winter" ? "text-white" : ""
            }`}
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
