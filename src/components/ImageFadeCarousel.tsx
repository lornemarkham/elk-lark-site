import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export type ImageCarouselSlide = { src: string; alt: string };

const DEFAULT_INTERVAL_MS = 4500;

export type ImageFadeCarouselProps = {
  slides: readonly ImageCarouselSlide[] | ImageCarouselSlide[];
  /** Auto-advance interval; dots reset the timer on click. */
  intervalMs?: number;
  /** Tailwind aspect utility (fixed responsive frame). */
  aspectClassName?: string;
  /**
   * elevated: standalone block (rounded-xl + shadow-lg).
   * nested: top of a card (rounded-t-xl, no shadow — parent supplies shadow).
   */
  tone?: "elevated" | "nested";
  /** Extra classes on the frame. */
  frameClassName?: string;
  /** Classes on the dots row (default: mt-4 flex justify-center gap-2). */
  dotsClassName?: string;
  dotAriaLabelPrefix?: string;
};

export default function ImageFadeCarousel({
  slides,
  intervalMs = DEFAULT_INTERVAL_MS,
  aspectClassName = "aspect-[4/3]",
  tone = "elevated",
  frameClassName = "",
  dotsClassName = "mt-4 flex justify-center gap-2",
  dotAriaLabelPrefix = "Go to slide",
}: ImageFadeCarouselProps) {
  const [index, setIndex] = useState(0);
  const [autoplayReset, setAutoplayReset] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, slides.length, autoplayReset]);

  const goTo = (idx: number) => {
    setIndex(idx);
    setAutoplayReset((n) => n + 1);
  };

  const toneFrame =
    tone === "nested"
      ? "rounded-t-xl shadow-none"
      : "rounded-xl shadow-lg";

  const frameClasses = [
    aspectClassName,
    "w-full max-w-full min-w-0 overflow-hidden",
    toneFrame,
    frameClassName,
  ]
    .filter(Boolean)
    .join(" ");

  if (slides.length === 0) return null;

  const current = slides[index];

  return (
    <>
      <div className={frameClasses}>
        <motion.img
          key={index}
          src={current.src}
          alt={current.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="block h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      {slides.length > 1 ? (
        <div className={dotsClassName}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goTo(idx)}
              className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                index === idx ? "bg-black" : "bg-gray-400"
              }`}
              aria-label={`${dotAriaLabelPrefix} ${idx + 1}`}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}
