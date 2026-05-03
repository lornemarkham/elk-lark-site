import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Footer from "../components/footer";
import SiteHero from "../components/SiteHero";
import { trackPlanCtaClick } from "../lib/analytics";

const WEDDING_START_PATH = "/start-your-lark?type=wedding" as const;
const WEDDING_PAGE_TYPE = "wedding" as const;
const PLAN_YOUR_WEDDING_CTA = "Plan Your Wedding" as const;

/** Matches Wellness page checklist styling (hero + section bottom CTAs only). */
function PlanningCtaChecklist({ variant }: { variant: "hero" | "section" }) {
  const listClass =
    variant === "hero"
      ? "space-y-0.5 text-sm font-medium leading-snug text-white/90"
      : "mt-2 space-y-0.5 text-sm leading-snug text-gray-500";
  return (
    <ul className={`mx-auto max-w-md text-center ${listClass}`}>
      <li>✔ No commitment</li>
      <li>✔ Fully customized to your group</li>
      <li>✔ We&apos;ll follow up shortly</li>
    </ul>
  );
}

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
  const [currentPoolSlide, setCurrentPoolSlide] = useState(0);
  const poolTimer = useRef<NodeJS.Timeout | null>(null);
  const poolSlides = [
    {
      src: "/images/poolside-wedding-ai-concepts/poolside-wedding-gazebo-ceremony-ai.png",
      alt: "Poolside wedding concept at ELK Lark",
    },
    {
      src: "/images/poolside-wedding-ai-concepts/image.png",
      alt: "Poolside wedding ceremony in swimwear concept at ELK Lark",
    },
    {
      src: "/images/poolside-wedding-ai-concepts/poolside-wedding-pool-jump-ai.png",
      alt: "Poolside wedding concept at ELK Lark",
    },
    {
      src: "/images/poolside-wedding-ai-concepts/poolside-wedding-evening-wide-ai.png",
      alt: "Poolside wedding concept at ELK Lark",
    },
    {
      src: "/images/poolside-wedding-ai-concepts/poolside-wedding-toast-ai.png",
      alt: "Poolside wedding concept at ELK Lark",
    },
    {
      src: "/images/poolside-wedding-ai-concepts/poolside-wedding-night-pool-ai.png",
      alt: "Poolside wedding concept at ELK Lark",
    },
  ] as const;

  const [poolSliderRef, poolInstanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slideChanged(slider) {
        setCurrentPoolSlide(slider.track.details.rel);
      },
      slides: {
        perView: 1,
        spacing: 0,
      },
      breakpoints: {
        "(min-width: 640px)": {
          slides: { perView: 1, spacing: 12 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 1, spacing: 16 },
        },
      },
    },
    []
  );

  useEffect(() => {
    poolTimer.current = setInterval(() => {
      if (poolInstanceRef.current) {
        poolInstanceRef.current.next();
      }
    }, 4500);

    return () => {
      if (poolTimer.current) clearInterval(poolTimer.current);
    };
  }, [poolInstanceRef]);

  return (
    <>
      <SiteHero
        title="Micro Weddings in the Okanagan"
        subtitle="Intimate, fully hosted weddings for 10–20 guests — relaxed, personal, and built around you."
        backgroundImage="/images/stays/gazebo.jpg"
        backgroundAlt="Outdoor gazebo at ELK Lark"
        ctaText={PLAN_YOUR_WEDDING_CTA}
        ctaLink={WEDDING_START_PATH}
        ctaOnClick={() =>
          trackPlanCtaClick({
            cta_text: PLAN_YOUR_WEDDING_CTA,
            cta_context: "hero",
            page_type: WEDDING_PAGE_TYPE,
            destination: WEDDING_START_PATH,
          })
        }
        ctaSupporting={<PlanningCtaChecklist variant="hero" />}
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

      <section className="overflow-x-hidden border-t border-teal-200 bg-gradient-to-b from-white to-cyan-50 text-gray-800">
        <div className="mx-auto w-full max-w-6xl min-w-0 px-6 py-32">
          <p className="mb-3 text-center text-sm font-semibold uppercase tracking-wide text-stone-500">
            Concept preview — yes, we used AI
          </p>
          <h2 className="mb-4 text-center font-serif text-4xl font-bold md:text-5xl">
            This could be your wedding
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-lg text-gray-600">
            We haven&apos;t hosted this exact wedding yet — so we imagined it. The space is real,
            the view is real, and the kind of day you&apos;re looking at here is absolutely on the
            table.
          </p>

          <div className="grid min-w-0 grid-cols-1 items-start gap-8 md:grid-cols-2">
            <div className="min-w-0 max-w-full overflow-hidden">
              <div
                ref={poolSliderRef}
                className="keen-slider w-full max-w-full min-w-0 overflow-hidden rounded-xl shadow-lg"
              >
                {poolSlides.map((slide) => (
                  <div
                    key={slide.src}
                    className="keen-slider__slide min-w-0 max-w-full overflow-hidden"
                  >
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      className="block h-auto w-full max-w-full rounded-xl object-cover aspect-[4/3] md:aspect-auto md:h-80"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center gap-2">
                {poolSlides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => poolInstanceRef.current?.moveToIdx(idx)}
                    className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                      currentPoolSlide === idx ? "bg-black" : "bg-gray-400"
                    }`}
                    aria-label={`Go to pool slide ${idx + 1}`}
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                This is the actual space — relaxed, open, and built for a full day together.
              </p>
              <p className="mt-2 text-xs leading-relaxed text-gray-500">
                These images are AI-generated concept previews. They show the vibe we&apos;re building
                toward — not a past event.
              </p>
            </div>
            <div className="min-w-0 max-w-full">
              <div className="max-w-md border-l-2 border-teal-200/70 pl-4">
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-stone-600">THE IDEA</h3>
                <p className="text-gray-700">
                  A real ceremony, then straight into food, music, drinks, poolside lounging, and
                  the kind of night people actually talk about later. Less ballroom, more summer
                  party with your favorite people.
                </p>
                <div className="mt-3 space-y-1">
                  <p className="text-2xl font-extrabold leading-tight tracking-wide text-teal-800">
                    AND YES — someone might end up in the pool.
                  </p>
                  <p className="text-xs italic text-gray-500">That&apos;s kind of the point.</p>
                </div>
                <div className="mt-3 space-y-1">
                  <p className="text-sm text-gray-600">
                    Perfect for couples who want something personal, relaxed, and a little
                    unexpected.
                  </p>
                  <p className="text-sm text-gray-700">
                    If you&apos;re bold enough to be the first, we&apos;ll make it worth it.
                  </p>
                </div>
              </div>
            </div>
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
          to={WEDDING_START_PATH}
          onClick={() =>
            trackPlanCtaClick({
              cta_text: PLAN_YOUR_WEDDING_CTA,
              cta_context: "bottom",
              page_type: WEDDING_PAGE_TYPE,
              destination: WEDDING_START_PATH,
            })
          }
          className="inline-block rounded-full bg-amber-600 px-8 py-3 font-semibold text-white transition hover:bg-amber-700"
        >
          {PLAN_YOUR_WEDDING_CTA}
        </Link>
        <PlanningCtaChecklist variant="section" />
      </section>

      <Footer />
    </>
  );
}
