import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";


export default function OutlawLark() {
  return (
    <>
      {/* Mini Hero */}
      <section className="relative h-[40vh] w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/videos/outlaw.mp4"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-5xl font-bold text-center px-4 font-serif">
            Outlaw Lark
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-20 px-6 text-center text-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          This Ain’t a Retreat. It’s a Revival.
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-700">
          Outlaw Lark is a no-BS weekend for people who want dirt under their nails, a cold one in their hand, and no one telling them what to do. It’s part freedom, part chaos, part healing. And it’s damn fun.
        </p>
      </section>

      {/* Activities */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <h3 className="text-2xl font-bold text-center mb-10">You Might Find Yourself...</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-800 text-lg">
            <li>🔥 Lighting up a bonfire with outlaw karaoke echoing in the trees</li>
            <li>🏍️ Tearing up forest roads on your dirt bike (or ours, soon...)</li>
            <li>🍖 Crushing smoked meat off the grill — powered by our Pignition crew</li>
            <li>🛠️ Fixing something in the gear garage while the music hits just right</li>
            <li>💦 Cannonballing into the pool after a day of dust and sun</li>
            <li>🎯 Maybe — just maybe — shooting cans (if you ask nicely)</li>
          </ul>
        </div>
      </section>

      {/* What to Bring */}
      <section className="bg-white py-20 px-6 text-center text-gray-800">
        <h3 className="text-2xl font-bold mb-6">What to Bring</h3>
        <p className="mb-6 max-w-xl mx-auto text-lg text-gray-600">
          Don’t show up unprepared. This isn’t a spa (well, unless you count Ember’s pop-up nail salon — appointments not guaranteed).
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left text-gray-700">
          <li>✅ Decent boots</li>
          <li>✅ Towel for the pool or lake</li>
          <li>✅ Your own bike or hiking gear</li>
          <li>✅ Respect for the land and people</li>
          <li>✅ Cooler, snacks, whatever fuels your lark</li>
          <li>✅ A sense of humour (non-negotiable)</li>
        </ul>
      </section>

      {/* Code of the Outlaw */}
      <section className="bg-gray-100 py-20 px-6 text-gray-800 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="text-2xl font-bold">Code of the Outlaw</h3>
          <p>No jerks. No drama. No posers. Be real, have fun, and look out for your crew.</p>
          <p>
            You’re not paying for a bed. You’re paying for an experience. There may or may not be a pillow involved.
          </p>
          <p>
            This is invite-only, friends-first territory. You show up right, we show you a hell of a time.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-strategy text-white py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Ride the Wild?</h2>
        <p className="mb-6 max-w-xl mx-auto">
          This isn’t a package. It’s a test drive of the future. Outlaw Lark is running lean while we build the dream.
        </p>
        <a
          href="mailto:hello@elklark.com"
          className="inline-block bg-black hover:bg-white hover:text-black text-white px-6 py-3 rounded-full font-semibold transition"
        >
          Email Us to Learn More
        </a>
      </section>

      <Footer />
    </>
  );
}
