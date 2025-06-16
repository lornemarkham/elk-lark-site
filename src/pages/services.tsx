import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

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
          move — we've got your vibe covered. test
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
      <p className="text-white text-sm mb-4">Relax, sip, float — this is your recharge zone.</p>
      <Link
        to="/restore"
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
        to="/strategy"
        className="inline-block bg-strategy text-white px-4 py-2 rounded hover:bg-opacity-80 transition z-20"
      >
        Think Bigger →
      </Link>
    </div>
  </div>
</section>


<section className="bg-white py-20 px-6 text-center text-gray-800">
  <h2 className="text-3xl md:text-4xl font-bold mb-10">Even More Nearby</h2>
  <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-12">
    The Okanagan is packed with laid-back luxuries. While they're not part of your Lark package (yet), they’re just around the corner.
  </p>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-accent">🍷 Wineries</h3>
      <p className="text-gray-600">Local vineyards, lake views, and stunning tastings in every direction.</p>
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-accent">🏌️ Golf</h3>
      <p className="text-gray-600">Championship courses and relaxed 9-holes — a short drive away.</p>
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-accent">🏖️ Beaches</h3>
      <p className="text-gray-600">Kalamalka Lake is steps away — float, sunbathe, or paddleboard.</p>
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-accent">🥾 Hiking</h3>
      <p className="text-gray-600">Endless forest trails and lookout points for all levels.</p>
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-accent">🚲 Rail Trail / E-Bikes</h3>
      <p className="text-gray-600">Rent an e-bike and coast the lakeside rail trail right from Coldstream.</p>
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-accent">🍺 Cideries & Pubs</h3>
      <p className="text-gray-600">Chill spots, local taps, and Okanagan craft tucked between orchards.</p>
    </div>
  </div>
</section>
   

      <Footer />
    </>
  );
}
