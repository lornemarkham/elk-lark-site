import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";
import { useSeason } from "../../state/SeasonContext";


export default function OutlawLark() {
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
          src="/videos/outlaw.mp4"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-5xl font-bold text-center px-4 font-serif">
            Outlaw Lark
          </h1>
        </div>
      </section>

      {/* Intro */}
<section className="bg-white py-20 px-6 text-center text-gray-800">
  <h2 className="text-3xl md:text-4xl font-bold mb-6">
    {season === "winter"
      ? "Winter Doesn’t Slow the Outlaw. It Refines It."
      : "This Ain’t a Retreat. It’s a Revival."}
  </h2>

  <p className="max-w-3xl mx-auto text-lg text-gray-700">
    {season === "winter"
      ? "Outlaw Lark in winter is about cold air, hot fires, and doing things properly. Snow under your boots, gear in the garage, and long nights that start outside and end wherever the stories take you. It’s quieter, sharper, and built for crews who don’t need a crowd to have a hell of a time."
      : "Outlaw Lark is a no-BS weekend for people who want dirt under their nails, a cold one in their hand, and no one telling them what to do. It’s part freedom, part chaos, part healing. And it’s damn fun."}
  </p>
</section>


{/* SUMMER */}
{season !== "winter" && (
  <section className="bg-gray-50 py-20 px-6">
    <div className="max-w-5xl mx-auto space-y-12">
      <h3 className="text-2xl font-bold text-center mb-10">
        You Might Find Yourself...
      </h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-800 text-lg">
        <li>🔥 Lighting up a bonfire with outlaw karaoke echoing in the trees</li>
        <li>🏍️ Tearing up forest roads on your dirt bike (or ours, soon...)</li>
        <li>🍖 Crushing smoked meat off the grill — powered by our Pignition crew</li>
        <li>🛠️ Fixing something in the gear garage while the music hits just right</li>
        <li>💦 Cannonballing into the pool after a day of dust and sun</li>
        <li>🎯 Maybe — just maybe — shooting cans (if you ask nicely)</li>
      </ul>
    </div>
  </section>
)}


{/* WINTER */}
{/* Ski Hills */}

{season === "winter" && (
<>
<section className="bg-gray-50">

  {/* SilverStar — Primary Feature */}
<div className="relative w-full h-[60vh]">
  <img
    src="/images/winter/silverstar.jpg"
    alt="SilverStar Mountain Resort"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Content overlay — NO dark wash */}
  <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
    <div className="text-center max-w-3xl">
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-serif text-black bg-white/30 px-4 py-2 rounded inline-block">
        SilverStar Mountain Resort
      </h3>

      <p className="text-base sm:text-lg md:text-xl text-black bg-white/30 px-4 py-3 rounded inline-block leading-relaxed mb-6">
        The local mountain. Bright village energy, dependable snow, and a straight shot from ELK Lark.
      </p>

      <div>
        <a
          href="https://www.skisilverstar.com"
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-900 transition"
        >
          Explore SilverStar
        </a>
      </div>
    </div>
  </div>
</div>

  {/* Big White + Revelstoke */}
{/* Big White + Revelstoke */}
<div className="max-w-7xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-10">

  {/* Big White */}
  <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-lg">
    <img
      src="/images/winter/bigwhite-winter.jpg"
      alt="Big White Ski Resort"
      className="absolute inset-0 w-full h-full object-cover"
    />

    <div className="absolute inset-0 z-10 flex items-end p-6">
      <div className="bg-white/30 backdrop-blur-sm rounded-lg p-4 max-w-sm">
        <h4 className="text-2xl font-bold mb-2 font-serif text-black">
          Big White
        </h4>
        <p className="text-sm mb-4 text-black">
          Wide terrain, dependable snow, and a classic Okanagan winter experience.
        </p>
        <a
          href="https://www.bigwhite.com"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold underline text-black"
        >
          Visit Big White →
        </a>
      </div>
    </div>
  </div>

  {/* Revelstoke */}
  <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-lg">
    <img
      src="/images/winter/revelstoke-winter.jpg"
      alt="Revelstoke Mountain Resort"
      className="absolute inset-0 w-full h-full object-cover"
    />

    <div className="absolute inset-0 z-10 flex items-end p-6">
      <div className="bg-white/30 backdrop-blur-sm rounded-lg p-4 max-w-sm">
        <h4 className="text-2xl font-bold mb-2 font-serif text-black">
          Revelstoke
        </h4>
        <p className="text-sm mb-4 text-black">
          Big mountain days. Steep lines. Legendary vertical when conditions line up.
        </p>
        <a
          href="https://www.revelstokemountainresort.com"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold underline text-black"
        >
          Visit Revelstoke →
        </a>
      </div>
    </div>
  </div>

</div>
</section>

{/* Secondary Marketing */}
<section className="bg-white py-24">
  <div className="w-full">
    <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 font-serif px-6 text-gray-900">
      Beyond the Chairlift
    </h3>

    <div className="relative">
      {/* Scroll container */}
      <div className="flex gap-6 overflow-x-auto px-6 pb-4 snap-x snap-mandatory scrollbar-hide">
        {[
          {
            title: "Snowmobile Rentals",
            img: "/images/winter/snowmobile.jpg",
            desc: "Rent sleds locally and access alpine terrain and deep snow zones.",
            link: "https://www.okanaganrecrentals.com/snowmobile-rentals/",
          },
          {
            title: "Heli-Skiing",
            img: "/images/winter/heliski.jpg",
            desc: "World-class heli terrain when conditions line up.",
            link: "https://www.cmhheli.com/"
          },
          {
            title: "Tube Town",
            img: "/images/winter/tubing.jpg",
            desc: "Fast laps, big laughs, zero skill required.",
            link: "https://www.skisilverstar.com/events-activities/winter-activities/winter-tubing/"
          },
          {
            title: "Ice Skating",
            img: "/images/winter/skating.jpg",
            desc: "Outdoor rinks and frozen-lake vibes when winter hits right.",
            link: "https://www.skisilverstar.com/events-activities/winter-activities/ice-skating/"
          },
          {
            title: "Nordic Skiing",
            img: "/images/winter/nordic.jpg",
            desc: "Sovereign Lake and surrounding trails offer unreal XC terrain.",
            link: "https://www.sovereignlake.com/",
          },
          // {
          //   title: "Backcountry Touring",
          //   img: "/images/winter/backcountry.jpg",
          //   desc: "Earn your turns or disappear quietly into the trees.",
          // },
          {
            title: "Winter Hiking",
            img: "/images/winter/winter-walk.jpg",
            desc: "Snow-covered trails, views, and slow-paced days.",
          },
          {
            title: "Scenic Drives",
            img: "/images/winter/scenic.jpg",
            desc: "Lake views, alpine roads, and winter light that hits different.",
            link: "https://www.johnchristmaseveryday.com/2025-christmas-light-tour"
          },
        ].map((item, i) => (
          <div
            key={i}
            className="
              snap-start
              bg-gray-50
              rounded-2xl
              overflow-hidden
              shadow-md
              hover:shadow-lg
              transition-shadow
              min-w-[260px]
              sm:min-w-[300px]
              md:min-w-[340px]
              max-w-[380px]
              flex-shrink-0
            "
          >
            <img
              src={item.img}
              alt={item.title}
              className="
                w-full
                h-[220px]
                sm:h-[240px]
                md:h-[260px]
                object-cover
              "
            />

            <div className="p-5 text-gray-900">
              <h4 className="text-lg font-bold mb-2 text-gray-900">
                {item.title}
              </h4>

              <p className="text-sm text-gray-700 mb-3">
                {item.desc}
              </p>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold underline text-gray-900 hover:text-black"
                >
                  Learn more →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white" />
      <div className="pointer-events-none absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white" />
    </div>
  </div>
</section>

{/* Tertiary Marketing */}
{/* Tertiary Marketing */}
<section className="bg-gray-50 py-24">
  <div className="space-y-24">

    {/* Fires */}
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div className="w-full h-[320px] md:h-[380px] rounded-2xl overflow-hidden shadow-lg">
        <img
          src="/images/winter/fire.jpg"
          alt="Winter bonfire"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div>
        <h3 className="text-3xl font-bold mb-4 font-serif text-gray-900">
          Fires, Food & Cold Air
        </h3>
        <p className="text-gray-700 text-lg">
          Big fires. Smoked food. Snow falling quietly while stories get louder.
          Winter doesn’t shut this place down — it turns it on.
        </p>
      </div>
    </div>

    {/* Garage */}
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h3 className="text-3xl font-bold mb-4 font-serif text-gray-900">
          Garage Nights & Warm Drinks
        </h3>
        <p className="text-gray-700 text-lg">
          Work on your gear, sing badly, throw darts, or just warm up and hang out.
          This is where winter nights end.
        </p>
      </div>

      <div className="w-full h-[320px] md:h-[380px] rounded-2xl overflow-hidden shadow-lg">
        <img
          src="/images/winter/garage.jpg"
          alt="Garage hangout"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>

    {/* Walks / Quiet */}
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div className="w-full h-[320px] md:h-[380px] rounded-2xl overflow-hidden shadow-lg">
        <img
          src="/images/winter/walks.jpg"
          alt="Winter walks"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div>
        <h3 className="text-3xl font-bold mb-4 font-serif text-gray-900">
          Quiet Mornings, Slow Walks
        </h3>
        <p className="text-gray-700 text-lg">
          Snow changes the pace. Coffee hits different.
          Walks are quieter. Conversations last longer.
        </p>
      </div>
    </div>

  </div>
</section>
</>
)}

{/* What to Bring */}
<section className="bg-white py-20 px-6 text-center text-gray-800">
  <h3 className="text-2xl font-bold mb-6">
    {season === "winter" ? "What to Bring (Winter Edition)" : "What to Bring"}
  </h3>

  <p className="mb-6 max-w-xl mx-auto text-lg text-gray-600">
    {season === "winter"
      ? "Winter at the Lark rewards those who come prepared. Cold air, warm fires, long days outside — dress smart and lean into it."
      : "Don’t show up unprepared. This isn’t a spa (well, unless you count Ember’s pop-up nail salon — appointments not guaranteed)."}
  </p>

  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left text-gray-700">
    {season === "winter" ? (
      <>
        <li>✅ Warm boots (you’ll use them)</li>
        <li>✅ Layers — cold mornings, warm fires</li>
        <li>✅ Snow gear or winter activity kit</li>
        <li>✅ Gloves, toque, and dry socks</li>
        <li>✅ Snacks, drinks, après essentials</li>
        <li>✅ A sense of humour (still non-negotiable)</li>
      </>
    ) : (
      <>
        <li>✅ Decent boots</li>
        <li>✅ Towel for the pool or lake</li>
        <li>✅ Your own bike or hiking gear</li>
        <li>✅ Respect for the land and people</li>
        <li>✅ Cooler, snacks, whatever fuels your lark</li>
        <li>✅ A sense of humour (non-negotiable)</li>
      </>
    )}
  </ul>
</section>

{/* Code of the Outlaw */}
<section className="bg-gray-100 py-20 px-6 text-gray-800 text-center">
  <div className="max-w-4xl mx-auto space-y-6">
    <h3 className="text-2xl font-bold">Code of the Outlaw</h3>

    <p>
      No jerks. No drama. No posers. Be real, have fun, and look out for your crew.
    </p>

    <p>
      {season === "winter"
        ? "You’re not booking a ski trip. You’re stepping into winter done right — fires burning, gear drying, stories getting better each night."
        : "You’re not paying for a bed. You’re paying for an experience. There may or may not be a pillow involved."}
    </p>

    <p>
      This is invite-only, friends-first territory. You show up right, we show you a hell of a time.
    </p>
  </div>
</section>

{/* CTA */}
<section className="bg-strategy text-white py-20 px-6 text-center">
  <h2 className="text-3xl md:text-4xl font-bold mb-4">
    {season === "winter" ? "Ready for Winter, Done Properly?" : "Ready to Ride the Wild?"}
  </h2>

  <p className="mb-6 max-w-xl mx-auto">
    {season === "winter"
      ? "This is the quiet season — fewer people, deeper experiences, and the kind of winter weekends you talk about for years."
      : "This isn’t a package. It’s a test drive of the future. Outlaw Lark is running lean while we build the dream."}
  </p>

  <a
    href="mailto:hello@elklark.com"
    className="inline-block bg-black hover:bg-white hover:text-black text-white px-6 py-3 rounded-full font-semibold transition"
  >
    Email Us to Learn More
  </a>
</section>

      <Footer />
    </>
  );
}
