import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import SiteHero from "../components/SiteHero";
const INSPIRATION_GROUPS: Array<{
  title: string;
  items: Array<{ title: string; description: string }>;
}> = [
  {
    title: "Around the Property",
    items: [
      { title: "Paddleboards", description: "Grab a board and make the lake part of your day." },
      { title: "Pool setup", description: "Arrive to a ready-to-go poolside setup for your group." },
      { title: "Fire pit nights", description: "Wrap the evening with a cozy fire and easy conversation." },
      { title: "Garage hangout", description: "Use the garage space for games, music, and downtime." },
    ],
  },
  {
    title: "Food & Fire",
    items: [
      { title: "BBQ dinners", description: "Simple, crowd-pleasing dinners tailored to your group." },
      { title: "Charcuterie + wine", description: "A relaxed board-and-bottle moment for your evening." },
      { title: "Breakfast setup", description: "Start the day easy with breakfast ready to go." },
      { title: "Stocked fridge", description: "Arrive with essentials already in place." },
    ],
  },
  {
    title: "Local & Adventure",
    items: [
      { title: "Wine tours", description: "Local tasting plans that fit your pace." },
      { title: "Golf days", description: "Build a golf day into your weekend flow." },
      { title: "Dirt biking", description: "Add trail-focused time for outdoor-minded groups." },
      { title: "Scooters", description: "Cruise nearby with easy local ride options." },
    ],
  },
  {
    title: "Slow & Restore",
    items: [
      { title: "Massage", description: "Bring in a calming reset for your group." },
      { title: "Yoga", description: "Optional sessions to ground the day." },
      { title: "Chill days", description: "Keep things open for rest, food, and connection." },
    ],
  },
];

export default function GuestExperiences() {
  return (
    <>
      <SiteHero
        title="Make It Yours"
        subtitle="Add simple touches or full experiences — we’ll tailor everything to you."
        backgroundImage="/images/stays/outdoor.jpg"
        backgroundImageFallback="/images/pool/pool6.jpg"
        backgroundAlt="Okanagan stay at ELK Lark"
        ctaText="Start Your Lark"
        ctaLink="/start"
      />

      <section className="bg-white px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-10 text-center font-serif text-3xl font-bold text-gray-800 md:text-4xl">
            Make It Yours
          </h2>
          <div className="space-y-10">
            {INSPIRATION_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 font-serif text-2xl font-bold text-gray-800">{group.title}</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item) => (
                    <article key={item.title} className="rounded-xl border border-stone-200 bg-stone-50/80 p-5">
                      <h4 className="text-base font-semibold text-gray-800">{item.title}</h4>
                      <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-stone-50 px-6 py-16 text-center text-gray-800">
        <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Ready to plan your stay?</h2>
        <Link
          to="/start-your-lark"
          className="inline-block rounded-full bg-amber-600 px-8 py-3 font-semibold text-white transition hover:bg-amber-700"
        >
          Start Your Lark
        </Link>
      </section>

      <Footer />
    </>
  );
}
