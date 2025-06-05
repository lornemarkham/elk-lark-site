import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [hoverTarget, setHoverTarget] = useState("");

const getBackground = () => {
  switch (hoverTarget) {
    case "outlaw":
      return (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/videos/outlaw.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      );
    case "restore":
      return (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/videos/restore.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      );
    case "strategy":
      return (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/videos/strategy.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      );
    default:
      return (
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url('/kal-beach.jpg')` }}
        />
      );
  }
};
  return (
    <>
      {/* Hero Section */}
<div className="relative min-h-screen text-white overflow-hidden">
  {getBackground()}
  <div className="absolute inset-0 bg-black/60 z-10" />

  {/* Logo top-center */}
  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 pt-12">
    <img
      src={
        hoverTarget === "outlaw"
          ? "/logo-outlaw.png"
          : hoverTarget === "restore"
          ? "/logo-restore.png"
          : hoverTarget === "strategy"
          ? "/logo-strategy.png"
          : "/logo-white.png"
      }
      alt="ELK Lark Logo"
      className="h-48 md:h-56"
    />
  </div>

  {/* Main CTA */}
  <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4">
    <h1 className="text-5xl font-bold mb-4 font-serif">Escape Ordinary. Live the Lark.</h1>
    <p className="text-xl max-w-2xl mb-8 font-sans">
      Crafted by three generations, ELK Lark delivers epic, hand-curated experiences in the
      heart of the Okanagan. Adventure harder. Recharge deeper. Strategize smarter.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 font-sans">
      <Link
        to="/outlaw"
        onMouseEnter={() => setHoverTarget("outlaw")}
        onMouseLeave={() => setHoverTarget("")}
        className="bg-restore hover:bg-restore px-6 py-3 rounded text-lg font-semibold"
      >
        Outlaw Lark
      </Link>
      <Link
        to="/restore"
        onMouseEnter={() => setHoverTarget("restore")}
        onMouseLeave={() => setHoverTarget("")}
        className="bg-accent hover:bg-secondary px-6 py-3 rounded text-lg font-semibold"
      >
        Restore Lark
      </Link>
      <Link
        to="/strategy"
        onMouseEnter={() => setHoverTarget("strategy")}
        onMouseLeave={() => setHoverTarget("")}
        className="bg-strategy hover:bg-strategy px-6 py-3 rounded text-lg font-semibold"
      >
        Strategy Lark
      </Link>
    </div>
  </div>
</div>


      {/* Choose Your Adventure Section */}
      <section className="bg-white py-16 px-4 text-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Adventure</h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {/* Outlaw Lark */}
          <div className="border rounded-xl shadow p-6 text-center hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-2">Outlaw Lark</h3>
            <p className="mb-4">
              Unplug. Get rugged. Experience the wild side of the Okanagan with our
              adventure-focused weekends. test again
            </p>
            <Link to="/outlaw" className="text-red-600 font-bold hover:underline">
              Learn More →
            </Link>
          </div>

          {/* Restore Lark */}
          <div className="border rounded-xl shadow p-6 text-center hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-2">Restore Lark</h3>
            <p className="mb-4">
              Relax, recharge, and reconnect. Wellness and leisure experiences designed
              for the modern wanderer.
            </p>
            <Link to="/restore" className="text-purple-600 font-bold hover:underline">
              Learn More →
            </Link>
          </div>

          {/* Strategy Lark */}
          <div className="border rounded-xl shadow p-6 text-center hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-2">Strategy Lark</h3>
            <p className="mb-4">
              Plan your next big move. Escape the grind while staying connected with
              purpose-driven retreats.
            </p>
            <Link to="/strategy" className="text-blue-600 font-bold hover:underline">
              Learn More →
            </Link>
          </div>
        </div>
      </section>

      
      <section className="bg-stone-100 py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">More Than a Weekend</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-700 mb-10">
            ELK Lark is a cross-generational passion project. We craft bold adventures, serene escapes, and focused retreats in the heart of the Okanagan.
        </p>
        <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto text-gray-800">
            <div>
            <div className="text-4xl mb-2">🏔️</div>
            <h3 className="font-semibold text-xl mb-1">Unleash Adventure</h3>
            <p className="text-sm">From alpine trails to wild lakes — we know how to explore with grit.</p>
            </div>
            <div>
            <div className="text-4xl mb-2">🧘</div>
            <h3 className="font-semibold text-xl mb-1">Find Stillness</h3>
            <p className="text-sm">Stretch, breathe, and soak — wellness is woven into every moment.</p>
            </div>
            <div>
            <div className="text-4xl mb-2">💼</div>
            <h3 className="font-semibold text-xl mb-1">Think Deep</h3>
            <p className="text-sm">Our retreats offer mental clarity and strategic support in nature’s quiet.</p>
            </div>
        </div>
        </section>


        <section className="py-16 bg-white px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
                {/* Image side */}
                <img
                src="/okanagan-experience.jpg" // Replace with your image
                alt="Okanagan Retreat"
                className="rounded-xl shadow-lg object-cover w-full h-96"
                />

                {/* Text side */}
                <div>
                <h2 className="text-3xl font-bold mb-4">Why the Okanagan?</h2>
                <p className="text-gray-700 text-lg mb-6">
                    The Okanagan isn’t just a destination — it’s a state of mind. Crisp lake mornings,
                    sun-drenched trails, and starlit nights around a fire. Whether you’re here to unplug,
                    unwind, or level up — there’s room for it all.
                </p>
                <Link
                    to="/experiences"
                    className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
                >
                    Discover Your Experience
                </Link>
                </div>
            </div>
            </section>
    </>
  );
}
