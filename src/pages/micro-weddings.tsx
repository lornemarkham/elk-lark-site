import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

/**
 * Image paths — swap when you have dedicated wedding photography.
 */
const IMAGES = {
  hero: "/stays/kal-hero.jpg",
  ceremony: "/images/pool/pool6.jpg",
  gazebo: "/stays/gazebo.jpg",
  garden: "/images/pool/pool2.jpg",
  lifestyle: "/images/food/food11.jpg",
  lakeAccent: "/kal-beach.jpg",
} as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-amber-700 text-xs sm:text-sm font-semibold tracking-[0.28em] uppercase mb-4">
      {children}
    </p>
  );
}

export default function MicroWeddings() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-end sm:justify-center text-center px-6 pb-20 sm:pb-24 pt-36 sm:pt-28 overflow-hidden">
        <img
          src={IMAGES.hero}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-amber-200/95 text-[11px] sm:text-sm font-medium tracking-[0.35em] uppercase mb-6">
            Coldstream · Kalamalka Lake
          </p>
          <h1 className="text-white text-[2.35rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold font-serif leading-[1.05] tracking-tight">
            Above the lake,
            <span className="block mt-2 sm:mt-3 text-white/95 font-light italic">
              yours — start to finish.
            </span>
          </h1>
          <p className="mt-10 text-white/90 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto leading-[1.75]">
            ELK Lark in Coldstream: layered decks, Kalamalka at your shoulder, enough room for the{" "}
            <span className="text-white font-normal">10–30 people</span> who actually belong in the
            frame. No ballroom. No run sheet. No audience you didn’t choose.
          </p>
          <p className="mt-5 text-white/55 text-sm tracking-wide">
            Summer dates are limited.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center sm:gap-5">
            <Link
              to="/guest-experiences"
              className="group inline-flex justify-center items-center px-10 py-4 rounded-full bg-amber-600 hover:bg-amber-500 text-white text-[15px] font-semibold tracking-wide transition-all shadow-[0_8px_30px_-8px_rgba(217,119,6,0.55)] hover:shadow-[0_12px_40px_-10px_rgba(217,119,6,0.65)] ring-1 ring-white/10"
            >
              Start Your Lark
            </Link>
            <Link
              to="/guest-experiences#inquiry-form"
              className="inline-flex justify-center items-center px-10 py-4 rounded-full border border-white/40 text-white text-[15px] font-semibold tracking-wide bg-white/5 hover:bg-white/12 backdrop-blur-sm transition-all"
            >
              Inquire About a Date
            </Link>
          </div>
        </div>
      </section>

      {/* Emotional intro */}
      <section className="bg-[#faf9f6] py-24 md:py-36 px-6">
        <div className="max-w-2xl mx-auto">
          <SectionLabel>Why here</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-gray-900 leading-tight">
            You didn’t fall in love in a ballroom.
          </h2>
          <div className="mt-8 space-y-5 text-gray-600 text-lg leading-[1.75]">
            <p>
              Some people want cues and choreography. Others want{" "}
              <strong className="text-gray-800 font-medium">Coldstream</strong>,{" "}
              <strong className="text-gray-800 font-medium">Kalamalka</strong>, and a day that moves
              like a party that happens to open with vows — not a clipboard calling the shots.
            </p>
            <p>
              That’s ELK Lark. Tight guest counts (think{" "}
              <strong className="text-gray-800 font-medium">10–30</strong>
              ), fast turns, second chapters, plans that landed late. No aisle performance. No
              measuring your day against someone else’s feed. You, your people, a patch of Okanagan
              most maps don’t shout about.
            </p>
          </div>
        </div>
      </section>

      {/* Layered flow — narrative spine */}
      <section className="bg-white py-24 md:py-36 px-6 border-y border-stone-200/60">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16 md:mb-20">
            <SectionLabel>The flow</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-gray-900 leading-tight">
              One property. Multiple moments.
            </h2>
            <p className="mt-6 text-gray-600 text-lg leading-relaxed">
              You walk it in order — or you don’t. Start where the lake reads clearest: vows, a
              handful of witnesses, nobody parked in a distant row. Step down for drinks — glass in
              hand, sun lower, conversation loose. Let the night settle around the pool, the patio,
              the corners that weren’t on any diagram. Same dirt underfoot the whole time.{" "}
              <span className="text-gray-800">No reset. No crew rolling in between acts.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                img: IMAGES.ceremony,
                alt: "Lake view over pool and Kalamalka Lake",
                title: "Where you say it",
                body: "Up top: water wide open behind you. People close — seated, standing, tiered so no one’s squinting from row twelve. The lake works; you speak.",
              },
              {
                img: IMAGES.gazebo,
                alt: "Gazebo at dusk with string lights",
                title: "When the sun goes",
                body: "Light drops. Gazebo glow. Toasts that run long because they should. One hour you’ll cite without trying.",
              },
              {
                img: IMAGES.garden,
                alt: "Pool and outdoor lounge",
                title: "Where the night lands",
                body: "Down below: slower pulse. Drinks, chairs, someone in the pool because why not. Still the same address. Still your crew.",
              },
            ].map((card) => (
              <article
                key={card.title}
                className="group flex flex-col rounded-2xl overflow-hidden bg-stone-50 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] ring-1 ring-stone-200/80 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] hover:ring-stone-300/60 transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden bg-stone-200">
                  <img
                    src={card.img}
                    alt={card.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-7 md:p-8 flex flex-col flex-1">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-gray-900">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-gray-600 text-[15px] leading-relaxed flex-1">{card.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle + image */}
      <section className="relative py-24 md:py-36 px-6 bg-[#f5f3ef]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_60px_-20px_rgba(0,0,0,0.25)] ring-1 ring-stone-900/10">
              <img
                src={IMAGES.lifestyle}
                alt="Outdoor grill and shared meal"
                className="w-full aspect-[4/5] object-cover lg:min-h-[520px]"
              />
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/20 rounded-2xl" />
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2 lg:pl-4">
            <SectionLabel>The feeling</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-gray-900 leading-tight">
              No reception line. Just a long exhale.
            </h2>
            <div className="mt-8 space-y-5 text-gray-600 text-lg leading-[1.75]">
              <p>
                Smoke off the grill. Drinks on stone. Long table or chairs in a loose orbit — however
                you actually eat together. Loud by the pool or quiet on the rail: your call.
              </p>
              <p className="text-gray-700">
                <strong className="font-semibold text-gray-900">ELK Lark built the place for how
                people live in it.</strong> Same rule here: the day should sound like you when you
                tell it Monday — not like you ticked boxes off someone else’s PDF.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lake pull-quote strip */}
      <div className="relative min-h-[280px] md:min-h-[340px] flex items-center justify-center overflow-hidden">
        <img
          src={IMAGES.lakeAccent}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/85 via-stone-900/70 to-stone-900/85" />
        <blockquote className="relative z-10 max-w-3xl mx-auto px-8 text-center">
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-light leading-snug">
            The lake doesn’t need branding.
            <span className="block mt-3 text-white/85 text-lg sm:text-xl font-sans font-normal tracking-wide">
              Coldstream. Off the obvious map. Yours for the day.
            </span>
          </p>
        </blockquote>
      </div>

      {/* For you if */}
      <section className="bg-white py-24 md:py-36 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <SectionLabel>Fit</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
              You’ll know.
            </h2>
          </div>
          <ul className="grid sm:grid-cols-2 gap-5 md:gap-6">
            {[
              "Your list tops out around thirty — and they know your middle name",
              "You want sun on the water, not pinspots on a dance floor",
              "The schedule flexes when the moment does",
              "Nobody needs to ‘present’ you to a room",
              "This couldn’t have happened on a generic lot",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-4 p-6 md:p-7 rounded-2xl bg-stone-50/80 border border-stone-200/70"
              >
                <span className="text-amber-600 text-xl leading-none font-serif" aria-hidden>
                  ·
                </span>
                <span className="text-gray-800 text-[15px] md:text-base leading-relaxed font-medium">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What we shape */}
      <section className="bg-[#faf9f6] py-24 md:py-36 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <SectionLabel>Together</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
            Built with you — not off a shelf.
          </h2>
          <p className="mt-5 text-gray-600 text-lg leading-relaxed">
            Talk first. No grid of packages. We usually touch:
          </p>
          <ul className="mt-10 text-left space-y-3.5 text-gray-700 text-[17px] leading-relaxed">
            {[
              "Where you stand; where everyone lands without a cattle call",
              "Movement from beat to beat — not blackout breaks",
              "Food: fire, smoke, tables people actually pass plates across",
              "Volume: loud, hushed, or both before sunset",
            ].map((item) => (
              <li key={item} className="flex gap-4 items-start">
                <span className="text-amber-600 mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-amber-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Honest positioning */}
      <section className="bg-brand text-white py-20 md:py-28 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-amber-200/90 text-xs sm:text-sm font-semibold tracking-[0.28em] uppercase mb-4">
            Straight talk
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
            You’re not a slot on a spreadsheet.
          </h2>
          <p className="mt-8 text-white/88 text-lg leading-[1.85]">
            We’re not stacking Saturdays like a rental hall. ELK Lark in Coldstream is a{" "}
            <strong className="text-white font-semibold">small, hosted gathering</strong> on
            Kalamalka-side ground — for pairs who care how the story sounds years out, not how loud
            the signage was at the curb.
          </p>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative py-28 md:py-40 px-6 text-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-stone-900 to-stone-950" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.65rem] font-bold text-white leading-tight">
            Say it plain. We’ll answer the same way.
          </h2>
          <p className="mt-7 text-stone-400 text-lg leading-relaxed">
            Dates, rough headcount, the thing you can’t quite name — we reply straight.{" "}
            <span className="text-stone-500">Summer dates are limited.</span> We’d rather pass than
            oversell.
          </p>
          <div className="mt-11 flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <Link
              to="/guest-experiences"
              className="inline-flex justify-center items-center px-10 py-4 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-semibold tracking-wide transition shadow-[0_8px_32px_-8px_rgba(217,119,6,0.5)]"
            >
              Start Your Lark
            </Link>
            <Link
              to="/guest-experiences#inquiry-form"
              className="inline-flex justify-center items-center px-10 py-4 rounded-full border border-stone-500 text-stone-200 font-semibold tracking-wide hover:bg-white/5 transition"
            >
              Inquire About a Date
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
