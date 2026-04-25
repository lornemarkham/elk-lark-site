import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import SiteHero from "../components/SiteHero";

const WAYS_TO_USE = [
  {
    title: "Friends Weekends",
    copy: "Girls weekends, guys weekends, birthdays, reunions, and relaxed time together.",
  },
  {
    title: "Family Getaways",
    copy: "Pool time, waterslide fun, beach days, easy meals, and space for small families to connect.",
  },
  {
    title: "Golf Trips",
    copy: "Plan a golf-focused weekend with local course options, food, and downtime after your round.",
  },
  {
    title: "Wine Weekends",
    copy: "Explore Okanagan wine tasting, local wineries, and relaxed evenings back at basecamp.",
  },
  {
    title: "Couples Escapes",
    copy: "A private, low-pressure way to enjoy food, views, local activities, and time away.",
  },
  {
    title: "Outdoor Weekends",
    copy: "Paddleboarding, hiking, rail trail biking, fishing, and seasonal outdoor ideas.",
  },
];

const BUILD_INTO_WEEKEND = [
  "Private pool and waterslide time",
  "Walkable Kal Beach access",
  "Paddleboard fun",
  "BBQ meals and custom food options",
  "Healthy, casual, or comfort-food menus",
  "Wine tasting and local venue ideas",
  "Winery, brewery, and cidery tastings",
  "Golf day planning",
  "Rail trail and e-bike rental suggestions",
  "Hiking and lake activities",
  "Seasonal fishing and fall outdoor ideas",
];

const FLOW_BLOCKS = [
  {
    label: "Arrival",
    copy: "Settle in, get oriented, and ease into the weekend.",
  },
  {
    label: "Daytime",
    copy: "Choose your activity — golf, wine tasting, beach time, biking, hiking, or pool time.",
  },
  {
    label: "Food",
    copy: "Enjoy BBQ, custom meals, snacks, or a casual group dinner.",
  },
  {
    label: "Evening",
    copy: "Relax by the pool, hang out, play music, or head into town.",
  },
];

const WHO_FOR = [
  "Friends planning a weekend together",
  "Families looking for a fun Okanagan basecamp",
  "Couples wanting something more personal than a hotel",
  "Golf groups and wine weekend groups",
  "People who want local help shaping the trip",
];

const WHAT_DIFFERENT = [
  "Private-property feel without a generic hotel experience",
  "Flexible activity planning based on your group",
  "Food and hosting support available",
  "Close to Kal Beach and Okanagan activities",
  "Built for small groups who want something personal",
];

export default function GroupGetaways() {
  return (
    <>
      <SiteHero
        title="Group Getaways in the Okanagan"
        subtitle="Bring your people. We'll help shape the weekend around what you want to do."
        backgroundImage="/images/pool/pool2.jpg"
        backgroundImageFallback="/images/garage/garage-tv1.jpg"
        backgroundAlt="Pool at ELK Lark"
        ctaText="Start Planning Your Getaway"
        ctaLink="/start-your-lark?type=group"
      />

      <section className="bg-white text-gray-800">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="mb-6 font-serif text-3xl font-bold md:text-4xl">
            A flexible getaway built around your group
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Whether it&apos;s a friends weekend, family trip, golf getaway, wine weekend, or outdoor
            adventure, ELK Lark gives you a private Okanagan basecamp with food, activities, and
            local planning support.
          </p>
        </div>
      </section>

      <section className="bg-stone-50 text-gray-800">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-10 text-center font-serif text-3xl font-bold md:text-4xl">
            Ways to use the space
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {WAYS_TO_USE.map((card) => (
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
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-10 text-center font-serif text-3xl font-bold md:text-4xl">
            What you can build into the weekend
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {BUILD_INTO_WEEKEND.map((text) => (
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

      <section className="bg-stone-50 text-gray-800">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="mb-10 text-center font-serif text-3xl font-bold md:text-4xl">
            How a weekend can unfold
          </h2>
          <div className="space-y-10">
            {FLOW_BLOCKS.map((block) => (
              <div
                key={block.label}
                className="rounded-xl border border-stone-200 bg-white p-6 sm:p-8"
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
        <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
          Start planning your group getaway
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600">
          Tell us who&apos;s coming and what kind of weekend you want. We&apos;ll help shape the rest.
        </p>
        <Link
          to="/start-your-lark?type=group"
          className="inline-block rounded-full bg-amber-600 px-8 py-3 font-semibold text-white transition hover:bg-amber-700"
        >
          Start Your Lark
        </Link>
      </section>

      <Footer />
    </>
  );
}
