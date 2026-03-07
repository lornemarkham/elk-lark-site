import BulletHoleDecal from "./BulletHoleDecal";
import ScrollRevealDecal from "./ScrollRevealDecal";
import SectionTitleBlock from "./SectionTitleBlock";

const DIFFERENCES = [
  {
    title: "REAL FIRE",
    body: "Wood and flame. No gimmicks.",
  },
  {
    title: "NO BULL",
    body: "We cook good food. That's the whole deal.",
  },
  {
    title: "BACKYARD ENERGY",
    body: "Music, smoke, people, good times.",
  },
  {
    title: "OUTLAW SPIRIT",
    body: "Rules are flexible. Flavor isn't.",
  },
];

export default function ThePignitionDifference() {
  return (
    <section className="relative pt-6 sm:pt-8 pb-6 sm:pb-8 px-4 sm:px-6 overflow-hidden">
      <ScrollRevealDecal delay={0} className="absolute top-8 right-6 sm:right-10 z-20">
        <BulletHoleDecal variant={2} size={68} opacity={0.44} />
      </ScrollRevealDecal>
      <ScrollRevealDecal delay={35} className="absolute bottom-16 left-6 sm:left-10 z-20">
        <BulletHoleDecal variant={3} size={50} opacity={0.33} />
      </ScrollRevealDecal>
      <div className="absolute inset-0 bg-espresso" />
      <div
        className="absolute inset-0 opacity-75"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 80%, rgba(194,65,12,0.04) 0%, transparent 50%), linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 40%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionTitleBlock
          title="The Pignition Difference"
          className="mb-4"
        />
        <p className="text-stone-500 text-center text-lg max-w-2xl mx-auto mb-6">
          Because life's too short for boring barbecue.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {DIFFERENCES.map((item) => (
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

        <p className="mt-8 text-center text-stone-400 text-lg max-w-xl mx-auto">
          This isn't catering. It's a cookout worth showing up for.
        </p>
      </div>
    </section>
  );
}
