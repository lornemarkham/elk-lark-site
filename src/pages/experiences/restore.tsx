import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";
import { useSeason } from "../../state/SeasonContext";

export default function RestoreLark() {
  const { season } = useSeason();

  return (
    <>
      {/* Mini Hero */}
      <section className="relative h-[40vh] w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/videos/restore.mp4"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-5xl font-bold text-center px-4 font-serif">
            Restore Lark
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-20 px-6 text-center text-gray-800">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 font-serif">
          {season === "winter" ? "Slow the Season Down" : "Unwind & Recharge"}
        </h2>

        <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-700">
          {season === "winter"
            ? "Restore Lark in winter is about warmth, quiet, and space to breathe. Fewer plans, softer days, and the kind of calm that only shows up when the valley goes still. Fires on, snow outside, and nowhere you’re expected to be."
            : "Restore Lark is your invitation to slow down and savour the Okanagan lifestyle. Whether it’s a peaceful paddle, a beach afternoon, or a relaxing wine tour — we tailor each day to your mood."}
        </p>
      </section>

      {/* Experience Blocks */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-16 text-gray-800">

          {/* Block 1 */}
          <div className="space-y-4 text-center">
            <h3 className="text-2xl font-bold font-serif">
              {season === "winter" ? "Warmth & Stillness" : "Water & Sunshine"}
            </h3>
            <p className="text-lg text-gray-700">
              {season === "winter"
                ? "Long showers, warm rooms, hot drinks, and time to do nothing at all. Winter Restore is about comfort — not activity — and letting the day unfold naturally."
                : "From lake time to shaded afternoons by the pool, summer Restore is about easing into the day and staying there as long as you like."}
            </p>
          </div>

          {/* Block 2 */}
          <div className="space-y-4 text-center">
            <h3 className="text-2xl font-bold font-serif">
              Food, Wine & Simple Pleasures
            </h3>
            <p className="text-lg text-gray-700">
              {season === "winter"
                ? "Slow meals, comfort food, and a glass of something good when the fire’s going. No reservations rush — just time."
                : "Casual wine tastings, long lunches, and food that fits the moment. Nothing overbooked. Nothing forced."}
            </p>
          </div>

          {/* Block 3 */}
          <div className="space-y-4 text-center">
            <h3 className="text-2xl font-bold font-serif">
              Body Care & Reset
            </h3>
            <p className="text-lg text-gray-700">
              {season === "winter"
                ? "By arrangement, Restore Lark can include in-home massage or simple body care — especially while others are out skiing or exploring."
                : "Stretch, float, rest, or bring in additional care if that’s what your body’s asking for. Restore is flexible by design."}
            </p>
          </div>

          {/* Block 4 */}
          <div className="space-y-4 text-center">
            <h3 className="text-2xl font-bold font-serif">
              Quiet Time
            </h3>
            <p className="text-lg text-gray-700">
              {season === "winter"
                ? "Snow changes everything. Walks are quieter. Conversations last longer. Coffee tastes better."
                : "Beach walks, shady patios, or just sitting still. Sometimes restoring means doing very little — and doing it well."}
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F3EFEA] py-16 text-center px-6">
       <h3
  className={`text-3xl md:text-4xl font-serif mb-4 ${
    season === "winter" ? "text-gray-900" : ""
  }`}
>
  {season === "winter"
    ? "Your Quiet Season Starts Here"
    : "Every Guest Deserves Their Own Escape"}
</h3>

        <p className="max-w-2xl mx-auto text-lg mb-6 text-gray-700">
          {season === "winter"
            ? "Restore Lark runs gently in winter — fewer people, deeper calm, and space to actually rest."
            : "Restore Lark is flexible, effortless, and designed around you. Just reach out — and we’ll create something worth dreaming about."}
        </p>

        <Link
          to="/plan-your-retreat"
          data-analytics="cta_click"
          data-cta-location="restore_page_cta"
          data-cta-text="Plan Your Retreat"
          data-destination="/plan-your-retreat"
          data-experience-type="general"
        >
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-md transition">
            Plan Your Retreat
          </button>
        </Link>
      </section>

      <Footer />
    </>
  );
}