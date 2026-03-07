const REASONS = [
  {
    title: "Real fire.",
    body: "Wood and time. No gimmicks.",
  },
  {
    title: "No compromise.",
    body: "We don’t do “good enough.”",
  },
  {
    title: "Backyard energy.",
    body: "Meat, music, and people. That’s it.",
  },
  {
    title: "Outlaw spirit.",
    body: "Rules are for other people.",
  },
];

import BulletHoleDecal from "./BulletHoleDecal";
import ScrollRevealDecal from "./ScrollRevealDecal";
import SectionTitleBlock from "./SectionTitleBlock";

export default function WhyPignition() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <ScrollRevealDecal delay={0} className="absolute top-8 right-6 sm:right-10 z-20">
        <BulletHoleDecal variant={2} size={68} opacity={0.44} />
      </ScrollRevealDecal>
      <ScrollRevealDecal delay={35} className="absolute bottom-16 left-6 sm:left-10 z-20">
        <BulletHoleDecal variant={3} size={50} opacity={0.33} />
      </ScrollRevealDecal>
      {/* Espresso brown — distinct from charcoal/black */}
      <div className="absolute inset-0 bg-espresso" />
      <div
        className="absolute inset-0 opacity-75"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 80%, rgba(194,65,12,0.04) 0%, transparent 50%), linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 40%, rgba(0,0,0,0.2) 100%)",
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionTitleBlock title="Why Pignition" className="mb-5" />
        <p className="text-stone-500 text-center text-lg max-w-2xl mx-auto">
          Because life’s too short for boring barbecue.
        </p>

        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {REASONS.map((item) => (
            <div key={item.title} className="text-center">
              <h3 className="font-display text-2xl sm:text-3xl text-flame uppercase tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 text-stone-500 text-sm sm:text-base">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
