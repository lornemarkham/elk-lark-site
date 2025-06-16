import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      {/* Mini Hero Section */}
      <section className="relative h-72 w-full">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
          alt="Okanagan Nature"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-4xl md:text-5xl font-bold font-serif text-center px-4">
            The ELK Story
          </h1>
        </div>
      </section>

      {/* About Section */}
      <div className="bg-white text-gray-800 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg mb-6">
            ELK Lark is a passion project built by three generations — Ember, Lorne, and Kathy — to
            bring something truly rare to the Okanagan. Whether it’s tearing up dirt trails, sipping
            wine by the lake, or planning your next big move, ELK Lark is about the kind of
            experience that doesn’t come in a brochure.
          </p>

          <p className="text-lg mb-6">
            Every offering is hand-curated, drawing from our land, our gear, our stories — and the
            kind of people we love to host. It’s not about luxury or budget. It’s about soul.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">Choose Your Lark</h2>
          <ul className="space-y-4 text-lg">
            <li>
              <Link
                to="/outlaw"
                className="text-red-600 hover:underline font-semibold"
              >
                → Outlaw Lark
              </Link>{" "}
              — Rugged weekends with dirt, fire, beer, and bikes.
            </li>
            <li>
              <Link
                to="/restore"
                className="text-purple-600 hover:underline font-semibold"
              >
                → Restore Lark
              </Link>{" "}
              — Beach, wine, sunshine, and nothing on the schedule.
            </li>
            <li>
              <Link
                to="/strategy"
                className="text-blue-600 hover:underline font-semibold"
              >
                → Strategy Lark
              </Link>{" "}
              — Retreats for tech, growth, clarity, and creative fire.
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
