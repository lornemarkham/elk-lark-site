import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function OutlawLark() {
  return (
    <>
      {/* Hero with logo */}
      <section className="relative h-72 w-full bg-black">
        <img
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80"
          alt="Outlaw Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <img
            src="/logo-outlaw.png"
            alt="Outlaw Logo"
            className="h-28 mb-4"
          />
          <h1 className="text-white text-3xl md:text-4xl font-bold font-serif tracking-wide">
            For the Wild Ones
          </h1>
        </div>
      </section>

      {/* Experience Details */}
      <section className="bg-white text-gray-900 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Outlaw Lark</h2>
          <p className="text-lg mb-8">
            This isn’t your average weekend getaway. This is for the misfits, the grease-stained,
            the shotgunning legends, and the trail-blazing warriors who came to feel something real.
            If it sounds like too much… it probably is.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
          {/* Card 1 */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1569982175971-d92c292dbb4e?auto=format&fit=crop&w=1600&q=80"
              alt="Dirt Biking"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Dirt, Trails & Chaos</h3>
              <p className="text-gray-700 text-sm">
                Ride FSRs, explore backcountry, or bring your own bike and wrench it in our garage
                like it’s a clubhouse.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1604151054095-33be7b477d2a?auto=format&fit=crop&w=1600&q=80"
              alt="Pool Party"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Poolside Mayhem</h3>
              <p className="text-gray-700 text-sm">
                Huge pool. Big waterslide. Cold drinks. Chaos guaranteed. Bring the floaties or
                launch off the deep end.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1581963701688-cdc9d46a7fa3?auto=format&fit=crop&w=1600&q=80"
              alt="Garage"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">The Wrench Cave</h3>
              <p className="text-gray-700 text-sm">
                Fully-loaded mechanic garage with TV, karaoke, darts, fridge & tools. Kick back or
                get your hands greasy.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1602620579749-1a4c94f7d294?auto=format&fit=crop&w=1600&q=80"
              alt="Firepit Nights"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Bonfires & Bullshit</h3>
              <p className="text-gray-700 text-sm">
                End your night under the stars around a fire with stories, music, and the occasional
                spontaneous tattoo idea.
              </p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1617692855027-9e942f505d37?auto=format&fit=crop&w=1600&q=80"
              alt="Shooting Range"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Optional Range Time</h3>
              <p className="text-gray-700 text-sm">
                We don’t advertise it. But if you ask — and it’s legal — we shoot safely and
                respectfully. By request only.
              </p>
            </div>
          </div>

          {/* Card 6 */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1600&q=80"
              alt="The Crew"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Bring Your People</h3>
              <p className="text-gray-700 text-sm">
                Whether it's your riding crew, bachelor crew, or coworkers — this experience is
                built around your chaos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-black text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Want In?</h2>
        <p className="mb-6 text-lg">
          We don’t list prices here. You’ll have to reach out like a proper outlaw.
        </p>
        <Link
          to="/contact"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-semibold text-lg transition"
        >
          Contact Us
        </Link>
      </section>

      <Footer />
    </>
  );
}
