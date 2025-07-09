import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

export default function Services() {
  return (
    <>
      {/* Mini Hero */}
      <div className="relative h-[40vh] bg-black text-white flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
          alt="Experience Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <h1 className="text-4xl md:text-5xl font-bold z-10">Your Experience</h1>
      </div>

      {/* Intro */}
      <section className="py-20 px-6 text-center text-gray-800 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Pick your pace. Choose your Lark.
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Whether you're chasing dust clouds, recharging under the sun, or plotting your next big
          move — we've got your vibe covered.
        </p>
      </section>

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
            <p className="text-white text-sm mb-4">Unplug. Get rugged. Hit the wild side of the Okanagan.</p>
            <Link
              to="/experiences/outlaw"
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
            <p className="text-white text-sm mb-4">Relax, sip, float — this is your recharge zone.</p>
            <Link
              to="/experiences/restore"
              className="inline-block bg-accent text-white px-4 py-2 rounded hover:bg-opacity-80 transition z-20"
            >
              Restore Yourself →
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
            <p className="text-white text-sm mb-4">Work smarter in the wild. Plan, think, launch.</p>
            <Link
              to="/experiences/strategy"
              className="inline-block bg-strategy text-white px-4 py-2 rounded hover:bg-opacity-80 transition z-20"
            >
              Think Bigger →
            </Link>
          </div>
        </div>
      </section>

      {/* Flexible Offerings Section */}
      <section className="bg-white py-20 px-6 text-center text-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">Need something custom?</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-12">
          ELK Lark is about more than just packages — it's about people. We curate experiences to match your vibe, your event, your moment.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto text-left">
          <div>
            <h3 className="text-xl font-semibold text-accent mb-2">🏖️ Poolside Sessions</h3>
            <p className="text-gray-600">Small groups, good tunes, maybe a firepit hang. Bring your own cooler — we’ve got the views.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-accent mb-2">🥾 Bring Your Own Adventure</h3>
            <p className="text-gray-600">We’ve got trails, lakes, hills, and horsepower. You bring the gear, we’ll show you the spots.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-accent mb-2">🍖 Backyard BBQs</h3>
            <p className="text-gray-600">Smoked meats, open air, no stress. We’ll make it memorable — even if it’s just Tuesday.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-accent mb-2">💍 Small Weddings</h3>
            <p className="text-gray-600">Don’t want a banquet hall? Set the tone, bring your own planner — we’ve got the backdrop.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-accent mb-2">🍷 Wine + Cider Tours</h3>
            <p className="text-gray-600">We’ll help you build a route or maybe even join you. There’s no shortage of good pours nearby.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-accent mb-2">🧘‍♀️ Spa Vibes</h3>
            <p className="text-gray-600">Mobile massage, nails, or just sun-soaking with a drink in hand. Chill defined.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-accent mb-2">🍺 Insider Eats & Drinks</h3>
            <p className="text-gray-600">We know chefs, pub owners, and secret spots. Let us book you in or guide your evening.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-accent mb-2">📅 Event-Based Stays*</h3>
            <p className="text-gray-600">Coming for Funtastic, a golf tourney, or your company’s offsite? We’ll help you set up shop.</p>
          </div>
        </div>
        <p className="mt-10 text-sm italic text-gray-500 max-w-xl mx-auto">
          *We don’t publicly offer overnight stays yet — but we do host services for friends. Email us to plan something custom.
        </p>
        <Link
          to="/start"
          className="mt-8 inline-block bg-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-700 transition"
        >
          Contact Us to Craft Your Lark →
        </Link>
      </section>

      <Footer />
    </>
  );
}
