import React from "react";
import Footer from "../../components/Footer";

export default function OutlawLark() {
  return (
    <>
      {/* Mini Hero */}
      <div className="relative h-80 w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1505245208761-ba872912fac0?auto=format&fit=crop&w=1600&q=80"
          alt="Outlaw Lark Hero"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <img
            src="/logo-outlaw.png"
            alt="Outlaw Lark Logo"
            className="h-28 md:h-40"
          />
        </div>
      </div>

      {/* Experience Highlights */}
      <section className="bg-white text-gray-800 px-6 py-16">
        <div className="max-w-5xl mx-auto space-y-10">
          <h1 className="text-4xl font-bold text-center">Outlaw Lark</h1>
          <p className="text-lg text-center max-w-3xl mx-auto">
            ELK Lark’s rugged offering — built for bold weekends, wild roads, and backyard hangouts
            that go way off-script.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1502920917128-1aa500764b79?auto=format&fit=crop&w=1600&q=80"
                alt="Private Pool"
                className="rounded-lg shadow object-cover w-full h-64"
              />
              <h2 className="text-2xl font-semibold">Private Poolside Recovery</h2>
              <p>
                After a long ride or a hike up the ridge, nothing hits like our pool, waterslide, and
                a cold one.
              </p>
            </div>

            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1615290647364-0b21ebbb6b99?auto=format&fit=crop&w=1600&q=80"
                alt="Garage Hangout"
                className="rounded-lg shadow object-cover w-full h-64"
              />
              <h2 className="text-2xl font-semibold">The Outlaw Garage</h2>
              <p>
                Fully loaded. Grab a beer, hit the karaoke, throw darts, or wrench on your own gear.
                It’s your clubhouse.
              </p>
            </div>

            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1602179037574-4be0e1d85b81?auto=format&fit=crop&w=1600&q=80"
                alt="Outlaw BBQ"
                className="rounded-lg shadow object-cover w-full h-64"
              />
              <h2 className="text-2xl font-semibold">Outlaw BBQ</h2>
              <p>
                Smoked meat. Real fire. Big sky. Let us serve up a backyard BBQ that feels like a
                rebel’s feast.
              </p>
            </div>

            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=1600&q=80"
                alt="Forest Road Adventure"
                className="rounded-lg shadow object-cover w-full h-64"
              />
              <h2 className="text-2xl font-semibold">Forest Road Escapes</h2>
              <p>
                Truck rides deep into the hills. Alpine lakes. Off-grid sunsets. Come explore what
                most never reach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Grit Statement */}
      <section className="bg-black text-white px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wider">
          Raise Hell. Then Cool Off.
        </h2>
        <p className="max-w-2xl mx-auto text-lg">
          Ride fast. Swim hard. Eat loud. We built this for the misfits, the makers, and the ones who
          don’t need a tour guide to find freedom. Out here, you set the tone.
        </p>
      </section>

      {/* Pricing Info */}
      <section className="bg-zinc-100 text-gray-800 px-6 py-12 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold">Pricing & Booking</h2>
          <p>
            Every Outlaw Lark weekend is unique. Pricing varies based on group size, activity
            choices, and season.
          </p>
          <p>
            To build your custom experience,{" "}
            <a
              href="/contact"
              className="text-amber-700 font-semibold hover:underline"
            >
              get in touch →
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
