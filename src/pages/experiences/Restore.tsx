import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

export default function RestoreLark() {
  return (
    <>
      {/* Hero Banner */}
      <div className="relative">
        <img
          src="/logo-restore.png"
          alt="ELK LARK Restore Logo"
          className="mx-auto py-12 h-32"
        />
        <img
          src="https://images.unsplash.com/photo-1587502536263-9298f4d5c3e8"
          alt="Relaxing Retreat"
          className="w-full h-64 object-cover opacity-80"
        />
      </div>

      {/* Experience Section */}
      <section className="bg-white py-16 px-6 text-gray-800 text-center">
        <h1 className="text-4xl font-bold mb-6">Relax. Recharge. Restore.</h1>
        <p className="max-w-3xl mx-auto text-lg mb-10">
          The Restore Lark is for those who want the Okanagan without breaking a sweat. This is slow-living at its finest — golf, wineries, beach lounges, garden-to-table snacks, and views for days.
        </p>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="rounded-lg overflow-hidden shadow">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
              alt="Winery"
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Okanagan Wineries</h3>
              <p className="text-sm text-gray-600">
                Explore the best wineries in BC with self-paced tours or hosted tastings.
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow">
            <img
              src="https://images.unsplash.com/photo-1620200423934-5dcdc71a6f74"
              alt="Lakeside"
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Kal Lake Chill</h3>
              <p className="text-sm text-gray-600">
                Walk to Kal Beach or lounge by our private pool — your pace, your peace.
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow">
            <img
              src="https://images.unsplash.com/photo-1508154048109-de555266b5ee"
              alt="Massage"
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Optional Mobile Spa</h3>
              <p className="text-sm text-gray-600">
                Add-on massages, yoga, or reiki with trusted local mobile spa partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="bg-gray-100 text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">Pricing & Booking</h2>
        <p className="text-gray-700 text-lg mb-6 max-w-xl mx-auto">
          Every Restore Lark is personalized. Let’s talk about your ideal dates, interests, and extras. We'll build it from there.
        </p>
        <Link
          to="/contact"
          className="bg-accent hover:bg-secondary text-white px-8 py-3 rounded-lg transition"
        >
          Start the Conversation →
        </Link>
      </section>

      <Footer />
    </>
  );
}
