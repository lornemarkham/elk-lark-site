import { useEffect, useState } from "react";
import BulletHoleDecal from "./BulletHoleDecal";
import ScrollRevealDecal from "./ScrollRevealDecal";

/* Smoke elements: origin 40–60% width, slightly above bottom. Sizes 150–420px, varied shapes. */
const SMOKE_ELEMENTS = [
  { left: "50%", bottom: "2%", w: 380, h: 420, anim: "smoke-rise-dense", dur: 12, delay: 0, dense: true },
  { left: "48%", bottom: "3%", w: 320, h: 380, anim: "smoke-rise-fast", dur: 10, delay: 1, dense: true },
  { left: "52%", bottom: "2%", w: 300, h: 360, anim: "smoke-rise-shoot", dur: 9, delay: 2.5, dense: true },
  { left: "45%", bottom: "4%", w: 280, h: 340, anim: "smoke-rise-turbulent", dur: 14, delay: 3.5, dense: false },
  { left: "55%", bottom: "3%", w: 260, h: 320, anim: "smoke-rise-wide", dur: 18, delay: 5, dense: false },
  { left: "50%", bottom: "1%", w: 340, h: 400, anim: "smoke-rise-dense", dur: 11, delay: 6.5, dense: true },
  { left: "42%", bottom: "3%", w: 220, h: 300, anim: "smoke-rise-sway", dur: 15, delay: 8, dense: false },
  { left: "58%", bottom: "2%", w: 240, h: 280, anim: "smoke-rise-turbulent", dur: 13, delay: 9.5, dense: false },
  { left: "47%", bottom: "5%", w: 200, h: 260, anim: "smoke-rise-fast", dur: 10, delay: 11, dense: false },
  { left: "53%", bottom: "4%", w: 180, h: 240, anim: "smoke-rise-shoot", dur: 8, delay: 12.5, dense: false },
  { left: "44%", bottom: "2%", w: 300, h: 350, anim: "smoke-rise-sway", dur: 16, delay: 14, dense: false },
  { left: "56%", bottom: "3%", w: 270, h: 330, anim: "smoke-rise-dense", dur: 12, delay: 15.5, dense: false },
  { left: "40%", bottom: "4%", w: 160, h: 220, anim: "smoke-rise-turbulent", dur: 14, delay: 17, dense: false },
  { left: "60%", bottom: "2%", w: 170, h: 200, anim: "smoke-rise-fast", dur: 11, delay: 18.5, dense: false },
  { left: "50%", bottom: "3%", w: 250, h: 310, anim: "smoke-rise-wide", dur: 17, delay: 20, dense: true },
];

/* Ember particles: linear easing, longer duration, negative delays for mid-flight on load, overlap for continuous flow. */
const EMBER_PARTICLES = [
  { left: "49%", bottom: "8%", size: 4, anim: "ember-rise-1", dur: 3.1, delay: -2.2, bright: true },
  { left: "51%", bottom: "6%", size: 3, anim: "ember-rise-2", dur: 2.95, delay: -1.5, bright: false },
  { left: "48%", bottom: "10%", size: 5, anim: "ember-rise-3", dur: 3.2, delay: -0.8, bright: true },
  { left: "52%", bottom: "7%", size: 3, anim: "ember-rise-4", dur: 2.85, delay: 0, bright: false },
  { left: "50%", bottom: "9%", size: 4, anim: "ember-rise-5", dur: 3.05, delay: -2.6, bright: true },
  { left: "47%", bottom: "8%", size: 3, anim: "ember-rise-6", dur: 2.9, delay: -1.1, bright: false },
  { left: "53%", bottom: "7%", size: 4, anim: "ember-rise-7", dur: 3.25, delay: -0.4, bright: false },
  { left: "49%", bottom: "11%", size: 3, anim: "ember-rise-8", dur: 2.88, delay: -2.9, bright: true },
  { left: "51%", bottom: "8%", size: 5, anim: "ember-rise-1", dur: 3.08, delay: -1.8, bright: false },
  { left: "50%", bottom: "6%", size: 3, anim: "ember-rise-2", dur: 2.92, delay: -0.6, bright: true },
  { left: "48%", bottom: "9%", size: 4, anim: "ember-rise-3", dur: 3.15, delay: -2.3, bright: false },
  { left: "52%", bottom: "10%", size: 3, anim: "ember-rise-4", dur: 2.82, delay: -1.0, bright: false },
  { left: "50%", bottom: "7%", size: 3, anim: "ember-rise-5", dur: 3.12, delay: -2.0, bright: false },
  { left: "49%", bottom: "9%", size: 4, anim: "ember-rise-6", dur: 2.96, delay: -0.9, bright: true },
];

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bgOffset = Math.min(scrollY * 0.35, 140);
  const textOffset = Math.min(scrollY * 0.12, 50);
  const grainOffsetX = scrollY * 0.012;
  const grainOffsetY = scrollY * 0.02;

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-24 pb-8 overflow-hidden">
      <ScrollRevealDecal delay={0} className="absolute top-10 right-6 sm:top-12 sm:right-10 z-20">
        <BulletHoleDecal variant={1} size={100} opacity={0.55} />
      </ScrollRevealDecal>
      <ScrollRevealDecal delay={25} className="absolute bottom-24 left-4 sm:left-8 z-20">
        <BulletHoleDecal variant={2} size={64} opacity={0.42} />
      </ScrollRevealDecal>
      <ScrollRevealDecal delay={50} className="absolute top-1/2 right-2 sm:right-4 z-20 -translate-y-1/2">
        <BulletHoleDecal variant={3} size={52} opacity={0.32} />
      </ScrollRevealDecal>
      {/* 1. Background image — parallax (moves slower than scroll) */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
          style={{
            backgroundImage: "url(/images/hero-bbq-gathering.png)",
            height: "130%",
            top: "-15%",
            transform: `translate3d(0, ${-bgOffset}px, 0)`,
          }}
        />
      </div>

      {/* 2. Dark overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.52) 30%, rgba(0,0,0,0.58) 55%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      {/* 3. String light glow — 10 halos at visible bulb positions (upper hero), clearly visible but subtle, gentle breathe */}
      <div
        className="light-glow-layer absolute inset-0 z-[2] pointer-events-none overflow-hidden"
        aria-hidden
        style={{ filter: "blur(38px)" }}
      >
        {[
          { left: "12%", top: "9%", size: "22%", opacity: 0.42, dur: 8.5, delay: 0 },
          { left: "26%", top: "11%", size: "20%", opacity: 0.38, dur: 7, delay: 1.6 },
          { left: "38%", top: "8%", size: "24%", opacity: 0.44, dur: 9, delay: 3.2 },
          { left: "50%", top: "7%", size: "26%", opacity: 0.46, dur: 6.5, delay: 4.8 },
          { left: "62%", top: "9%", size: "23%", opacity: 0.42, dur: 8, delay: 6.4 },
          { left: "74%", top: "10%", size: "21%", opacity: 0.4, dur: 7.5, delay: 0.8 },
          { left: "86%", top: "11%", size: "20%", opacity: 0.38, dur: 9.5, delay: 2.4 },
          { left: "20%", top: "16%", size: "19%", opacity: 0.36, dur: 6.8, delay: 4 },
          { left: "52%", top: "15%", size: "21%", opacity: 0.4, dur: 8.2, delay: 5.6 },
          { left: "80%", top: "17%", size: "18%", opacity: 0.35, dur: 7.2, delay: 1.2 },
        ].map((halo, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: halo.left,
              top: halo.top,
              width: halo.size,
              height: halo.size,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle at center, rgba(255,200,120,${halo.opacity}) 0%, rgba(255,175,85,${halo.opacity * 0.5}) 35%, rgba(255,160,70,${halo.opacity * 0.2}) 55%, transparent 72%)`,
              animation: `halo-glow-shimmer ${halo.dur}s ease-in-out ${halo.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* 4. Fire / heat glow — deep orange, dark red, fade to black (above image, under smoke) */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 108%, rgba(180,50,20,0.4) 0%, rgba(140,35,15,0.25) 25%, rgba(80,20,10,0.12) 50%, transparent 70%), radial-gradient(ellipse 60% 35% at 50% 102%, rgba(200,70,25,0.35) 0%, rgba(160,45,18,0.2) 40%, transparent 65%), linear-gradient(to top, rgba(120,30,10,0.2) 0%, rgba(60,15,5,0.08) 25%, transparent 50%)",
        }}
      />

      {/* 5. Smoke layer — origin 40–60% width, slightly above bottom; 15 elements */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none overflow-hidden"
        aria-hidden
      >
        {SMOKE_ELEMENTS.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full origin-bottom"
            style={{
              left: s.left,
              bottom: s.bottom,
              width: s.w,
              height: s.h,
              marginLeft: -s.w / 2,
              background: s.dense
                ? "radial-gradient(ellipse 45% 42% at 50% 100%, rgba(208,200,192,0.78) 0%, rgba(168,160,152,0.38) 40%, transparent 70%)"
                : "radial-gradient(ellipse 48% 44% at 50% 100%, rgba(195,188,180,0.62) 0%, rgba(155,148,140,0.28) 44%, transparent 74%)",
              filter: `blur(${Math.min(28 + s.w / 16, 48)}px)`,
              willChange: "transform, opacity",
              animation: `${s.anim} ${s.dur}s ease-in-out infinite`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* 6. Ember / spark particles — wind-blown paths, soft glow, above smoke */}
      <div
        className="absolute inset-0 z-[6] pointer-events-none overflow-hidden"
        aria-hidden
      >
        {EMBER_PARTICLES.map((e, i) => {
          const colors = [
            "radial-gradient(circle, rgba(248,160,80,0.98) 0%, rgba(230,100,40,0.85) 45%, transparent 70%)",
            "radial-gradient(circle, rgba(255,180,90,0.95) 0%, rgba(220,110,45,0.8) 50%, transparent 70%)",
            "radial-gradient(circle, rgba(235,95,50,0.95) 0%, rgba(194,65,12,0.8) 50%, transparent 70%)",
            "radial-gradient(circle, rgba(255,140,60,0.92) 0%, rgba(210,80,30,0.75) 50%, transparent 70%)",
          ];
          const glow = e.bright
            ? "0 0 6px 2px rgba(255,160,70,0.65), 0 0 14px 4px rgba(194,65,12,0.35), 0 0 24px 8px rgba(180,50,20,0.15)"
            : "0 0 5px 1px rgba(255,140,60,0.5), 0 0 12px 3px rgba(194,65,12,0.25)";
          return (
            <div
              key={i}
              className="absolute rounded-full origin-center"
              style={{
                left: e.left,
                bottom: e.bottom,
                width: e.size,
                height: e.size,
                marginLeft: -e.size / 2,
                background: colors[i % colors.length],
                boxShadow: glow,
                filter: "drop-shadow(0 0 4px rgba(255,180,100,0.4))",
                willChange: "transform, opacity",
                animation: `${e.anim} ${e.dur}s linear infinite`,
                animationDelay: `${e.delay}s`,
              }}
            />
          );
        })}
      </div>

      {/* 7. Vignette — keeps headline clear */}
      <div
        className="absolute inset-0 z-[8] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, transparent 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* 8. Film grain — cinematic noise overlay, subtle parallax (below text) */}
      <div
        className="absolute inset-0 z-[9] pointer-events-none overflow-hidden"
        aria-hidden
        style={{
          transform: `translate3d(${grainOffsetX}px, ${grainOffsetY}px, 0)`,
          willChange: "transform",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.055] film-grain-texture"
          style={{
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
              '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.88" numOctaves="4" stitchTiles="stitch"/></filter><rect width="256" height="256" filter="url(#g)"/></svg>'
            )}")`,
            backgroundSize: "256px 256px",
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* 9. Hero text — western wordmark (grit + fire glow on title), parallax */}
      <div
        className="relative z-10 text-center max-w-4xl mx-auto will-change-transform"
        style={{ transform: `translate3d(0, ${textOffset}px, 0)` }}
      >
        <div className="hero-logo hero-logo-western">
          <div className="hero-wordmark-wrap">
            <div className="hero-wordmark-fire-glow" aria-hidden />
            <h1 className="hero-logo-western-title hero-wordmark-grit">PIGNITION</h1>
          </div>
          <p className="hero-logo-western-stars" aria-hidden>★ ★ ★</p>
          <div className="hero-logo-western-tagline-wrap">
            <span className="hero-logo-western-line" aria-hidden />
            <p className="hero-logo-western-tagline">SMOKE • FIRE • MEAT</p>
            <span className="hero-logo-western-line" aria-hidden />
          </div>
          <p className="hero-logo-western-stars hero-logo-western-stars-bottom" aria-hidden>★ ★ ★</p>
          <p className="mt-4 text-[#f5f0e8] text-base sm:text-lg font-medium tracking-wide drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
            Real BBQ for real events.
            <br />
            Backyards. Weddings. Late nights.
          </p>
          <a
            href="#fire-up-your-event"
            className="mt-6 inline-block px-10 py-4 bg-btn-ignition text-white font-bold uppercase tracking-[0.2em] rounded-sm shadow-btn hover:scale-105 hover:shadow-btnHover transition-all duration-300 text-sm sm:text-base"
          >
            Fire Up Your Event
          </a>
          <p className="mt-5 text-stone-500 text-sm sm:text-base">
            Okanagan BBQ. Wood fire. Good meat. No bull.
          </p>
        </div>
      </div>
    </section>
  );
}
