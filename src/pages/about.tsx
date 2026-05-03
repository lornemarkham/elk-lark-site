import React from "react";
import { Compass, Sparkles, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import SiteHero from "../components/SiteHero";

const ABOUT_HEADING_ICON = "h-5 w-5 shrink-0 text-amber-600";

export default function About() {
  return (
    <>
      <SiteHero
        title="The ELK Story"
        backgroundImage="/images/adventures/adventure4.jpg"
        backgroundImageFallback="/images/stays/outdoor.jpg"
        overlayClassName="bg-black/25"
        backgroundAlt="Okanagan landscape near ELK Lark"
      />

      {/* About Section */}
      <div className="bg-white text-gray-800 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg mb-6">
            ELK Lark is a passion project rooted in family — Ember, Lorne, Kathy, and Angela — here
            to bring something truly rare to the Okanagan. Angela is our master event planner. She
            brings the event-planning brain — the person who knows how to turn a loose idea into a day
            that actually flows. Whether it’s
            time on the trails, wine by the lake, or a gathering that finally feels like yours, ELK
            Lark is about the kind of experience that doesn’t come in a brochure.
          </p>

          <p className="text-lg mb-6">
            Every experience is hand-curated, drawing from our land, our gear, our stories — and the
            kind of people we love to host. It’s not about luxury or budget. It’s about soul.
          </p>
        </div>
      </div>

      {/* Meet the Larks */}
      <section className="bg-white text-gray-800 px-6 pb-20 space-y-16 max-w-5xl mx-auto">
        {/* Ember */}
        <div className="md:flex items-center gap-6 space-y-6 md:space-y-0">
          <img
            src="/images/ember.jpg"
            alt="Ember"
            className="w-full md:w-48 rounded-xl object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Sparkles className={ABOUT_HEADING_ICON} aria-hidden />
              Ember – The Spark
            </h3>
            <p>
              At just 4 years old, Ember is the heart of ELK. With strong snack opinions,
              spontaneous dance parties, and a real eye for pinecones, she’s got big COO energy.
              Official titles: Chief Entertainment Officer, Trail Scout, and Mess Prevention Lead.
            </p>
          </div>
        </div>

        {/* Lorne */}
        <div className="md:flex md:flex-row-reverse items-center gap-6 space-y-6 md:space-y-0">
          <img
            src="/images/lorne2.jpg"
            alt="Lorne"
            className="w-full md:w-48 rounded-xl object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Wrench className={ABOUT_HEADING_ICON} aria-hidden />
              Lorne – The Builder
            </h3>
            <p>
              Lorne brings the muscle and the mischief. Whether he’s building trails, fixing bikes,
              or crafting backend logic, he’s the engine behind ELK’s big ideas. Mostly found near a
              tool, a truck, or a well-timed one-liner.
            </p>
          </div>
        </div>

        {/* Kathy */}
        <div className="md:flex items-center gap-6 space-y-6 md:space-y-0">
          <img
            src="/images/kathy.jpg"
            alt="Kathy"
            className="w-full md:w-48 rounded-xl object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Compass className={ABOUT_HEADING_ICON} aria-hidden />
              Kathy – The Compass
            </h3>
            <p>
              Kathy is the soul of the operation — the calm, the class, the garden-grown grounding
              force. With decades of hospitality under her belt, she’s the reason things feel right.
              And her muffins? Unreal.
            </p>
          </div>
        </div>

        <p className="italic text-center text-gray-500 pt-4">
          ELK is more than a brand — it’s a long game. No pressure, Ember. But your business card is
          already printed.
        </p>
      </section>

      {/* Experience direction */}
      <section className="grid md:grid-cols-3 gap-6 px-6 pb-20">
        <div className="relative h-80 rounded-xl overflow-hidden group shadow-lg">
          <img
            src="/images/stays/outdoor.jpg"
            alt="Outdoor space at ELK Lark"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 z-10 flex flex-col justify-end bg-black/50 p-6">
            <h3 className="mb-2 text-2xl font-bold text-white">Wellness Retreats</h3>
            <p className="mb-4 text-sm text-white">
              Space to slow down, reset, reconnect, or host something meaningful.
            </p>
            <Link
              to="/wellness-retreats"
              className="z-20 inline-block rounded bg-amber-600 px-4 py-2 text-white transition hover:bg-amber-700"
              data-analytics="cta_click"
              data-cta-location="about_funnel_cards"
              data-cta-text="Explore wellness retreats →"
              data-destination="/wellness-retreats"
              data-experience-type="wellness"
            >
              Explore wellness retreats →
            </Link>
          </div>
        </div>

        <div className="relative h-80 rounded-xl overflow-hidden group shadow-lg">
          <img
            src="/images/stays/gazebo.jpg"
            alt="Gazebo at ELK Lark"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 z-10 flex flex-col justify-end bg-black/50 p-6">
            <h3 className="mb-2 text-2xl font-bold text-white">Micro Weddings</h3>
            <p className="mb-4 text-sm text-white">
              Small, relaxed celebrations with room for food, family, and a real sense of place.
            </p>
            <Link
              to="/micro-weddings"
              className="z-20 inline-block rounded bg-amber-600 px-4 py-2 text-white transition hover:bg-amber-700"
              data-analytics="cta_click"
              data-cta-location="about_funnel_cards"
              data-cta-text="Explore micro weddings →"
              data-destination="/micro-weddings"
              data-experience-type="wedding"
            >
              Explore micro weddings →
            </Link>
          </div>
        </div>

        <div className="relative h-80 rounded-xl overflow-hidden group shadow-lg">
          <img
            src="/images/pool/pool2.jpg"
            alt="Pool at ELK Lark"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 z-10 flex flex-col justify-end bg-black/50 p-6">
            <h3 className="mb-2 text-2xl font-bold text-white">Group Getaways</h3>
            <p className="mb-4 text-sm text-white">
              Private pool days, garage hangs, BBQs, lake access, and weekends that turn into stories.
            </p>
            <Link
              to="/group-getaways"
              className="z-20 inline-block rounded bg-amber-600 px-4 py-2 text-white transition hover:bg-amber-700"
              data-analytics="cta_click"
              data-cta-location="about_funnel_cards"
              data-cta-text="Explore group getaways →"
              data-destination="/group-getaways"
              data-experience-type="group"
            >
              Explore group getaways →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
