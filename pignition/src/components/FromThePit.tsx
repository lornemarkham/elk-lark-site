import { useState, useCallback, useEffect } from "react";
import SectionTitleBlock from "./SectionTitleBlock";

const GALLERY_IMAGES = [
  "/images/food2.jpg",
  "/images/food5.jpg",
  "/images/food10.jpg",
  "/images/food11.jpg",
  "/images/food14.jpg",
  "/images/food17.jpg",
  "/images/food20.jpg",
];

export default function FromThePit() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : i <= 0 ? GALLERY_IMAGES.length - 1 : i - 1
    );
  }, []);
  const goNext = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : i >= GALLERY_IMAGES.length - 1 ? 0 : i + 1
    );
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, close, goPrev, goNext]);

  return (
    <section className="relative pt-6 sm:pt-8 pb-6 sm:pb-8 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[#0b0a09]" />
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage: "url(\"/textures/wood.jpg\")",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionTitleBlock
          title="From The Pit"
          className="mb-4"
          titleClassName="text-[#f5f0e8] drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]"
        />
        <p className="text-stone-500 text-center text-lg max-w-xl mx-auto mb-6">
          Real food. Real fire. No bull.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {GALLERY_IMAGES.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="aspect-square rounded-sm overflow-hidden border border-stone-700/60 bg-stone-900/80 shadow-lg text-left transition-all duration-200 hover:border-flame/50 hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-flame/50 focus:ring-offset-2 focus:ring-offset-[#0b0a09]"
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover pointer-events-none"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-stone-800/90 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
            aria-label="Close"
          >
            <span className="text-2xl leading-none">&times;</span>
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-stone-800/90 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
            aria-label="Previous image"
          >
            <span className="text-2xl leading-none">&#8249;</span>
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-stone-800/90 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
            aria-label="Next image"
          >
            <span className="text-2xl leading-none">&#8250;</span>
          </button>

          <img
            src={GALLERY_IMAGES[lightboxIndex]}
            alt=""
            className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
