import BulletHoleDecal from "./BulletHoleDecal";
import ScrollRevealDecal from "./ScrollRevealDecal";
import SectionTitleBlock from "./SectionTitleBlock";

export default function TheVibe() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <ScrollRevealDecal delay={0} className="absolute bottom-14 right-6 sm:right-10 z-20">
        <BulletHoleDecal variant={1} size={56} opacity={0.4} />
      </ScrollRevealDecal>
      <ScrollRevealDecal delay={30} className="absolute top-20 left-6 sm:left-10 z-20">
        <BulletHoleDecal variant={3} size={42} opacity={0.28} />
      </ScrollRevealDecal>
      {/* Dark base with smoky atmosphere */}
      <div className="absolute inset-0 bg-coal" />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(30,22,18,0.2) 0%, transparent 60%), linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)",
        }}
      />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <SectionTitleBlock title="The Vibe" className="mb-12" />
        <p className="text-stone-400 text-lg sm:text-xl leading-relaxed font-medium">
          Not polished. Not precious.
        </p>
        <p className="mt-8 text-stone-300 text-base sm:text-lg leading-loose">
          This is wood smoke in the air,
          <br />
          a drink in your hand,
          <br />
          bikes cooling off out front,
          <br />
          and something heavy sizzling on the pit.
        </p>
        <p className="mt-10 text-stone-400 text-base sm:text-lg leading-loose">
          Late nights.
          <br />
          Good people.
          <br />
          Fire doing what fire does.
        </p>
      </div>
    </section>
  );
}
