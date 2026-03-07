import SectionTitleBlock from "./SectionTitleBlock";

const PROOF_BLOCKS = [
  {
    heading: "REAL FIRE",
    body: "Wood. Smoke. Time. No shortcuts.",
  },
  {
    heading: "GOOD MEAT",
    body: "We source quality ingredients and cook them right.",
  },
  {
    heading: "COOKED BY HAND",
    body: "No catering factory food. Everything is cooked properly.",
  },
  {
    heading: "BUILT FOR EVENTS",
    body: "Backyards. Weddings. Parties. Food people remember.",
  },
];

export default function RealFoodNoBull() {
  return (
    <section className="relative pt-6 sm:pt-8 pb-6 sm:pb-8 px-4 sm:px-6 overflow-hidden">
      {/* Base + charcoal wood texture */}
      <div className="absolute inset-0 bg-[#0b0a09]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.72), rgba(0,0,0,0.72)), url(\"/textures/wood1.jpg\")",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Subtle overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.12) 100%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionTitleBlock
          title="Real Food. No Bull."
          className="mb-4"
          titleClassName="text-[#f5f0e8] drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]"
        />

        <p className="real-food-tagline text-center text-[#f5f0e8] text-sm sm:text-base font-semibold uppercase tracking-[0.28em] drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)] mb-6">
          Real Fire • Good Meat • Proper Cooking
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {PROOF_BLOCKS.map((block) => (
            <article
              key={block.heading}
              className="relative rounded-sm border border-stone-700/80 bg-stone-900/40 px-6 py-8 text-center transition-all duration-300 hover:border-flame/40"
              style={{
                boxShadow:
                  "inset 0 1px 0 0 rgba(255,255,255,0.02), 0 4px 20px rgba(0,0,0,0.4)",
              }}
            >
              <span
                className="absolute top-2 right-2 w-3 h-3 border-t border-r border-flame/40 rounded-tr"
                aria-hidden
              />
              <h3 className="font-display text-lg sm:text-xl text-flame uppercase tracking-tight">
                {block.heading}
              </h3>
              <p className="mt-3 text-stone-400 text-sm sm:text-base leading-relaxed">
                {block.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
