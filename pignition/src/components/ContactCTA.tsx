import BulletHoleDecal from "./BulletHoleDecal";
import ScrollRevealDecal from "./ScrollRevealDecal";
import SectionTitleBlock from "./SectionTitleBlock";

export default function ContactCTA() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <ScrollRevealDecal delay={0} className="absolute top-8 left-6 sm:left-10 z-20">
        <BulletHoleDecal variant={2} size={60} opacity={0.42} />
      </ScrollRevealDecal>
      <ScrollRevealDecal delay={25} className="absolute bottom-10 right-6 sm:right-10 z-20">
        <BulletHoleDecal variant={1} size={44} opacity={0.3} />
      </ScrollRevealDecal>
      <div className="absolute inset-0 bg-charcoal" />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(194,65,12,0.06) 0%, transparent 60%), linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 100%)",
        }}
      />
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <SectionTitleBlock title="Fire Up Your Event" className="mb-8" />
        <p className="text-stone-400 text-lg">
          Pop-ups. Catering. Backyard burns. Tell us what you’re thinking.
        </p>
        <a
          href="mailto:hello@pignition.com"
          className="mt-10 inline-block px-12 py-5 bg-btn-ignition text-white font-bold uppercase tracking-[0.2em] rounded-sm shadow-btn hover:scale-105 hover:shadow-btnHover transition-all duration-300"
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
}
