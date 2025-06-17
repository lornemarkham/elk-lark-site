import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

export default function StrategyLark() {
  return (
    <>
      {/* Hero Banner */}
      <div className="relative">
        <img
          src="/logo-strategy.png"
          alt="ELK LARK Strategy Logo"
          className="mx-auto py-12 h-32"
        />
        <img
          src="https://images.unsplash.com/photo-1549924231-f129b911e442"
          alt="Tech Retreat"
          className="w-full h-64 object-cover opacity-80"
        />
      </div>

      {/* Experience Section */}
      <section className="bg-white py-16 px-6 text-gray-800 text-center">
        <h1 className="text-4xl font-bold mb-6">Work Smart. Unplug Smarter.</h1>
        <p className="max-w-3xl mx-auto text-lg mb-10">
          Strategy Lark is where high-output founders and creatives escape to reset — or ramp up. Whether it’s deep work by the lake or campfire strategy with your crew, this isn’t a boardroom. It’s a battleground for big ideas.
        </p>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="rounded-lg overflow-hidden shadow">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
              alt="Remote Work"
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Focused Cowork</h3>
              <p className="text-sm text-gray-600">
                Wi-Fi strong, distractions low. Work when you need to — chill when you don’t.
              </p>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow">
            <img
              src="https://images.unsplash.com/photo-1573164574396-9d3a5fbe0b19"
              alt="Team Meeting"
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Connect Deeper</h3>
              <p className="text-sm text-gray-600">
                Whiteboards, firepits, and mountain views. Build better with your core team.
              </p>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow">
            <img
              src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5"
              alt="Reset"
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Recharge Boldly</h3>
              <p className="text-sm text-gray-600">
                Paddle at sunrise, beers in the garage, stargaze at night. This is balance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="bg-gray-100 text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">Custom Pricing for Strategy Retreats</h2>
        <p className="text-gray-700 text-lg mb-6 max-w-xl mx-auto">
          Whether you're a startup crew or solo founder, we tailor the experience. Let's talk about your vision and make it real.
        </p>
        <Link
          to="/contact"
          className="bg-strategy hover:bg-blue-800 text-white px-8 py-3 rounded-lg transition"
        >
          Start the Conversation →
        </Link>
      </section>

      <Footer />
    </>
  );
}
