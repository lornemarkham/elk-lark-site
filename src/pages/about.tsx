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

          <p className="text-lg mb-10">
            Every offering is hand-curated, drawing from our land, our gear, our stories — and the
            kind of people we love to host. It’s not about luxury or budget. It’s about soul.
          </p>
        </div>
      </div>

      {/* Video Card Section */}
      <section className="grid md:grid-cols-3 gap-6 px-6 pb-20">
        {/* Outlaw Lark */}
        <div className="relative h-80 rounded-xl overflow-hidden group shadow-lg">
          <video
            autoPlay
            loop
            muted
            playsInline
            src="/videos/outlaw.mp4"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/50 z-10 flex flex-col justify-end p-6">
            <h3 className="text-white text-2xl font-bold mb-2">Outlaw Lark</h3>
            <p className="text-white text-sm mb-4">
              Unplug. Get rugged. Hit the wild side of the Okanagan.
            </p>
            <Link
              to="/outlaw"
              className="inline-block bg-restore text-white px-4 py-2 rounded hover:bg-opacity-80 transition z-20"
            >
              Ride the Wild →
            </Link>
          </div>
        </div>

        {/* Restore Lark */}
        <div className="relative h-80 rounded-xl overflow-hidden group shadow-lg">
          <video
            autoPlay
            loop
            muted
            playsInline
            src="/videos/restore.mp4"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/50 z-10 flex flex-col justify-end p-6">
            <h3 className="text-white text-2xl font-bold mb-2">Restore Lark</h3>
            <p className="text-white text-sm mb-4">
              Beachside bliss, wine pours, and absolute ease.
            </p>
            <Link
              to="/restore"
              className="inline-block bg-restore text-white px-4 py-2 rounded hover:bg-opacity-80 transition z-20"
            >
              Reset & Restore →
            </Link>
          </div>
        </div>

        {/* Strategy Lark */}
        <div className="relative h-80 rounded-xl overflow-hidden group shadow-lg">
          <video
            autoPlay
            loop
            muted
            playsInline
            src="/videos/strategy.mp4"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/50 z-10 flex flex-col justify-end p-6">
            <h3 className="text-white text-2xl font-bold mb-2">Strategy Lark</h3>
            <p className="text-white text-sm mb-4">
              Whiteboards, wine, clarity, and creative breakthrough.
            </p>
            <Link
              to="/strategy"
              className="inline-block bg-restore text-white px-4 py-2 rounded hover:bg-opacity-80 transition z-20"
            >
              Build the Vision →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
