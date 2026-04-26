import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import SiteHero from "../components/SiteHero";
import { trackCtaClick } from "../lib/analytics";

const LOOKS_LIKE_ITEMS = [
  "Small group gatherings",
  "Workshops and small-group sessions in a private meeting space",
  "Professional yoga sessions (partner-led)",
  "Healthy meals tailored to dietary needs",
  "Evening mocktails and relaxed social time",
  "Poolside downtime and quiet reset space",
  "Optional activities: hiking, paddleboarding",
  "Flexible evenings (stay in or explore local spots)",
];

const SAMPLE_BLOCKS = [
  { label: "Morning", copy: "Coffee, light breakfast, slow start" },
  { label: "Midday", copy: "Group sessions and discussions in a private meeting space" },
  { label: "Afternoon", copy: "Yoga, hiking, paddleboarding, or pool time" },
  { label: "Evening", copy: "Healthy dinner, mocktails, and relaxed connection time" },
];

const INCLUDED = [
  "Private property experience",
  "Hosting support and coordination",
  "Healthy meal planning and prep",
  "Activity planning and local connections",
  "Flexible accommodation guidance (nearby stays when needed)",
];

export default function WellnessRetreats() {
  return (
    <>
      <SiteHero
        title="Wellness Retreats in the Okanagan"
        subtitle="Hosted, small-group experiences focused on health, connection, and reset."
        backgroundImage="/images/stays/outdoor.jpg"
        backgroundImageFallback="/images/pool/pool6.jpg"
        backgroundAlt="Outdoor stay at ELK Lark"
        ctaText="Plan Your Retreat Now"
        ctaLink="/start-your-lark?type=wellness"
        ctaOnClick={() =>
          trackCtaClick({
            cta_text: "Plan Your Retreat Now",
            placement: "wellness_hero",
            to_path: "/start-your-lark?type=wellness",
          })
        }
      />
      <section className="bg-white text-center text-gray-800">
        <p className="pb-6 text-sm text-gray-500">Takes less than a minute. We&apos;ll follow up personally.</p>
      </section>

      <section className="bg-white text-gray-800">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="mb-6 font-serif text-3xl font-bold md:text-4xl">
            A different kind of wellness retreat
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Not a resort. Not a package. A private, hosted experience designed entirely around your
            group. Everything is built to feel relaxed, personal, and effortless.
          </p>
        </div>
      </section>

      <section className="bg-stone-50 text-gray-800">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-stone-200">
              <img
                src="/images/stays/pool.jpg"
                alt="Pool at ELK Lark"
                className="h-64 w-full object-cover md:h-72"
              />
            </div>
            <div className="overflow-hidden rounded-xl border border-stone-200">
              <img
                src="/images/stays/outdoor.jpg"
                alt="Patio at ELK Lark"
                className="h-64 w-full object-cover md:h-72"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-gray-800">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-10 text-center font-serif text-3xl font-bold md:text-4xl">
            What this actually looks like
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {LOOKS_LIKE_ITEMS.map((text) => (
              <div
                key={text}
                className="rounded-xl border border-stone-200 bg-stone-50/80 p-6 shadow-sm"
              >
                <p className="text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-50 px-6 py-16 text-center text-gray-800">
        <p className="mx-auto mb-4 max-w-2xl text-lg text-gray-600">
          If this feels like the kind of weekend you&apos;ve been needing, we can help you plan it.
        </p>
        <Link
          to="/start-your-lark?type=wellness"
          onClick={() =>
            trackCtaClick({
              cta_text: "Start Your Lark",
              placement: "wellness_mid_clean",
              to_path: "/start-your-lark?type=wellness",
            })
          }
          className="inline-block rounded-full bg-amber-600 px-8 py-3 font-semibold text-white transition hover:bg-amber-700"
        >
          Start Your Lark
        </Link>
        <p className="mt-3 text-sm text-gray-500">Tell us a bit about your group. We&apos;ll take it from there.</p>
      </section>

      <section className="bg-stone-50 text-gray-800">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="mb-10 text-center font-serif text-3xl font-bold md:text-4xl">
            A sample weekend
          </h2>
          <div className="relative mx-auto max-w-xl space-y-10 border-l-2 border-amber-200 pl-8 md:pl-10">
            {SAMPLE_BLOCKS.map((block) => (
              <div key={block.label} className="relative">
                <span
                  className="absolute -left-[25px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-amber-600 bg-white md:-left-[27px]"
                  aria-hidden
                />
                <p className="text-sm font-semibold uppercase tracking-wide text-amber-800">
                  {block.label}
                </p>
                <p className="mt-2 text-lg text-gray-700">{block.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white text-gray-800">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="mb-6 font-serif text-2xl font-bold md:text-3xl">For guests</h2>
              <ul className="list-disc space-y-3 pl-5 text-gray-600">
                <li>Individuals looking to reset and recharge</li>
                <li>Friends planning a wellness weekend</li>
                <li>Small groups wanting something more intentional</li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 font-serif text-2xl font-bold md:text-3xl">For hosts</h2>
              <ul className="list-disc space-y-3 pl-5 text-gray-600">
                <li>Coaches and wellness practitioners</li>
                <li>Small group facilitators</li>
                <li>Product educators or workshop leaders</li>
                <li>Anyone wanting to run a retreat without handling logistics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 text-gray-800">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="mb-8 text-center font-serif text-3xl font-bold md:text-4xl">
            What&apos;s included
          </h2>
          <ul className="mx-auto max-w-2xl list-disc space-y-3 pl-5 text-lg text-gray-700">
            {INCLUDED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white px-6 py-20 text-center text-gray-800">
        <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Start planning your retreat</h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600">
          Share a few details and we&apos;ll help bring it to life.
        </p>
        <Link
          to="/start-your-lark?type=wellness"
          onClick={() =>
            trackCtaClick({
              cta_text: "Start Your Lark",
              placement: "wellness_bottom",
              to_path: "/start-your-lark?type=wellness",
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
