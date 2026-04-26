import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import SiteHero from "../components/SiteHero";
import { trackCtaClick } from "../lib/analytics";

const WHAT_YOU_GET = [
  "Intimate setting for 10–20 guests",
  "Ceremony and reception setup on-site",
  "Bride and groom getting-ready spaces",
  "Full food service (custom menus — BBQ to elevated casual dining)",
  "Cake options available",
  "Floral options and setup support",
  "Event planning and coordination support",
  "Photography options available",
  "Live music setup available (professional-grade equipment on-site)",
  "Flexible layout across property (pool, yard, garage space)",
  "Relaxed evening hangout space (lounge-style, gas fire features)",
];

const FLOW_BLOCKS = [
  {
    label: "Getting Ready",
    copy: "Private spaces to get ready on-site with your group",
  },
  {
    label: "Ceremony",
    copy: "Outdoor ceremony in a relaxed, natural setting",
  },
  {
    label: "Post-Ceremony",
    copy: "Photos, drinks, and time to connect",
  },
  {
    label: "Dinner",
    copy: "Shared meal with custom food — casual, high-quality, and personal",
  },
  {
    label: "Evening",
    copy: "Music, poolside time, lounge setup, and a relaxed celebration",
  },
];

const STYLE_CARDS = [
  {
    title: "Casual Celebration",
    copy: "Laid-back, personal, and focused on time with your people",
  },
  {
    title: "Poolside Wedding",
    copy: "A fun, non-traditional wedding with a relaxed Okanagan vibe",
  },
  {
    title: "Custom Setup",
    copy: "We shape the day around what you actually want",
  },
];

const WHO_FOR = [
  "Couples who want something smaller and more personal",
  "People who don't want to manage multiple vendors",
  "Those looking for a relaxed but meaningful experience",
  "Last-minute or flexible wedding timelines",
];

const WHAT_DIFFERENT = [
  "Everything is handled in one place",
  "Flexible and non-traditional approach",
  "Real property with personality (not a generic venue)",
  "Food and experience built around you",
  "Small group focus = better experience",
];

export default function MicroWeddings() {
  return (
    <>
      <SiteHero
        title="Micro Weddings in the Okanagan"
        subtitle="Intimate, fully hosted weddings for 10–20 guests — relaxed, personal, and built around you."
        backgroundImage="/images/stays/gazebo.jpg"
        backgroundAlt="Outdoor gazebo at ELK Lark"
        ctaText="Start Your Micro Wedding"
        ctaLink="/start-your-lark?type=wedding"
        ctaOnClick={() =>
          trackCtaClick({
            cta_text: "Start Your Micro Wedding",
            placement: "micro_weddings_hero",
            to_path: "/start-your-lark?type=wedding",
          })
        }
      />

      <section className="bg-white text-gray-800">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="mb-6 font-serif text-3xl font-bold md:text-4xl">A different kind of wedding</h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Skip the big venue and the stress. This is a private, small-group wedding experience where
            everything is handled for you — from setup to food to flow — so you can focus on the
            moment.
          </p>
        </div>
      </section>

      <section className="bg-stone-50 text-gray-800">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-10 text-center font-serif text-3xl font-bold md:text-4xl">
            What you actually get
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {WHAT_YOU_GET.map((text) => (
              <div
                key={text}
                className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
              >
                <p className="text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-gray-800">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="mb-10 text-center font-serif text-3xl font-bold md:text-4xl">
            How the day can unfold
          </h2>
          <div className="space-y-10">
            {FLOW_BLOCKS.map((block) => (
              <div
                key={block.label}
                className="rounded-xl border border-stone-200 bg-stone-50/80 p-6 sm:p-8"
              >
                <h3 className="font-serif text-xl font-bold text-gray-800">{block.label}</h3>
                <p className="mt-2 text-lg text-gray-700">{block.copy}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-xl border border-stone-200">
            <img
              src="/images/stays/outdoor.jpg"
              alt="Outdoor space at ELK Lark"
              className="h-64 w-full object-cover md:h-72"
            />
          </div>
        </div>
      </section>

      <section className="bg-stone-50 text-gray-800">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-10 text-center font-serif text-3xl font-bold md:text-4xl">
            Style options
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {STYLE_CARDS.map((card) => (
              <div
                key={card.title}
                className="flex flex-col rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <h3 className="font-serif text-xl font-bold text-gray-800">{card.title}</h3>
                <p className="mt-4 flex-1 text-gray-600">{card.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-gray-800">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="mb-8 text-center font-serif text-3xl font-bold md:text-4xl">
            Who this is for
          </h2>
          <ul className="mx-auto max-w-2xl list-disc space-y-3 pl-5 text-lg text-gray-700">
            {WHO_FOR.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-stone-50 text-gray-800">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="mb-8 text-center font-serif text-3xl font-bold md:text-4xl">
            What makes this different
          </h2>
          <ul className="mx-auto max-w-2xl list-disc space-y-3 pl-5 text-lg text-gray-700">
            {WHAT_DIFFERENT.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white px-6 py-20 text-center text-gray-800">
        <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Start planning your wedding</h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600">
          Tell us what you&apos;re thinking, and we&apos;ll help bring it together.
        </p>
        <Link
          to="/start-your-lark?type=wedding"
          onClick={() =>
            trackCtaClick({
              cta_text: "Start Your Lark",
              placement: "micro_weddings_bottom",
              to_path: "/start-your-lark?type=wedding",
            })
          }
          className="inline-block rounded-full bg-amber-600 px-8 py-3 font-semibold text-white transition hover:bg-amber-700"
        >
          Start Your Lark
        </Link>
      </section>

      <Footer />
    </>
  );
}
