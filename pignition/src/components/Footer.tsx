import BulletHoleDecal from "./BulletHoleDecal";
import ScrollRevealDecal from "./ScrollRevealDecal";
import SectionSeparator from "./SectionSeparator";

export default function Footer() {
  return (
    <footer className="relative py-8 px-6 overflow-hidden">
      <ScrollRevealDecal delay={0} className="absolute bottom-6 right-6 sm:right-10 z-20">
        <BulletHoleDecal variant={3} size={52} opacity={0.38} />
      </ScrollRevealDecal>
      <ScrollRevealDecal delay={20} className="absolute top-6 left-6 sm:left-10 z-20">
        <BulletHoleDecal variant={1} size={40} opacity={0.26} />
      </ScrollRevealDecal>
      <div className="absolute inset-0 bg-smoke" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 100%)",
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
        <SectionSeparator variant="light" className="absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-6xl px-6" />
        <span className="font-display text-2xl text-white uppercase tracking-tight">
          Pignition
        </span>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <p className="text-stone-500 text-sm">
            Southern Outlaw BBQ · Fire, smoke, steel.
          </p>
          <p className="text-stone-600 text-xs">
            From the crew behind{" "}
            <a
              href="https://elklark.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-flame transition-colors"
            >
              ELK Lark
            </a>
            .
          </p>
          <a
            href="/logo-concepts.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-500 hover:text-flame text-sm transition-colors"
          >
            Logo concepts
          </a>
        </div>
      </div>
    </footer>
  );
}
