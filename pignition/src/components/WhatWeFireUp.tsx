import SectionTitleBlock from "./SectionTitleBlock";

export default function WhatWeFireUp() {
  const panels = [
    {
      heading: "BACKYARD BBQ FEASTS",
      description:
        "We roll in with serious smoke, fire up the grill, and feed the whole damn party.",
    },
    {
      heading: "EVENTS & PARTIES",
      description:
        "Birthdays, lake days, weddings, garage hangs — if there's people and good times, we bring the meat.",
    },
    {
      heading: "OUTLAW COOKOUTS",
      description:
        "Big fire. Big flavor. Real BBQ done the way it should be.",
    },
  ];

  return (
    <section className="relative pt-6 pb-6 sm:pt-6 sm:pb-8 px-4 sm:px-6 overflow-hidden fire-up-section">
      {/* Decorative bullet decal — top right, subtle */}
      <div className="absolute top-6 right-6 sm:right-10 z-20 pointer-events-none" aria-hidden>
        <img src="/images/bullet1.png" alt="" className="w-16 h-16 sm:w-20 sm:h-20 object-contain opacity-80" />
      </div>
      {/* Decorative bullet decal — bottom left */}
      <div className="absolute bottom-10 left-4 sm:left-8 z-20 pointer-events-none" aria-hidden>
        <img src="/images/bullet1.png" alt="" className="w-14 h-14 sm:w-16 sm:h-16 object-contain opacity-80" />
      </div>
      {/* Base — dark charcoal */}
      <div className="absolute inset-0 bg-[#0b0a09]" />
      {/* Wood texture — project asset, visible but muted (~20% effect) */}
      <div
        className="absolute inset-0 fire-up-wood-texture"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.78), rgba(0,0,0,0.78)), url(\"/textures/wood.jpg\")",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Slight dark overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 65% at 50% 45%, transparent 0%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.4) 100%), linear-gradient(180deg, rgba(0,0,0,0.12) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.15) 100%)",
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionTitleBlock
          title="What We Fire Up"
          className="mb-8"
          titleClassName="text-[#f5f0e8] drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]"
        />

        {/* 3 panels — poster / outlaw cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {panels.map((panel, i) => (
            <article
              key={i}
              className="fire-up-panel group relative rounded-sm border-2 border-stone-700/80 bg-gradient-to-b from-stone-900/90 to-black/95 px-6 py-8 sm:px-8 sm:py-10 text-center transition-all duration-300 hover:border-flame/50 hover:shadow-glowSm"
              style={{
                boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.03), 0 6px 28px rgba(0,0,0,0.5), 0 2px 12px rgba(0,0,0,0.35)",
              }}
            >
              {/* Rough corner accent */}
              <span
                className="absolute top-2 right-2 w-3 h-3 border-t border-r border-flame/40 rounded-tr"
                aria-hidden
              />
              <h3 className="font-display text-xl sm:text-2xl text-[#f5f0e8] uppercase tracking-tight drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
                {panel.heading}
              </h3>
              <span className="mt-3 inline-block h-px w-10 bg-flame/50" aria-hidden />
              <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed">
                {panel.description}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-stone-400 text-base sm:text-lg max-w-2xl mx-auto">
          From backyard parties to wedding receptions — we cook real food for real crowds.
        </p>
      </div>
    </section>
  );
}
