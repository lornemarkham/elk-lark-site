import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export type SiteHeroProps = {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  /** If the primary image fails to load, swap to this local path once. */
  backgroundImageFallback?: string;
  backgroundAlt?: string;
  /** Tailwind overlay classes (e.g. bg-black/30). Defaults to bg-black/40. */
  overlayClassName?: string;
  /** Extra classes on the hero background img (e.g. object position for crop focus). */
  backgroundImageClassName?: string;
  ctaText?: string;
  ctaLink?: string;
  ctaOnClick?: () => void;
  titleTestId?: string;
  subtitleTestId?: string;
};

/**
 * Standard full-width page hero: background image, dark overlay, centered title/subtitle, optional CTA.
 */
export default function SiteHero({
  title,
  subtitle,
  backgroundImage,
  backgroundImageFallback,
  backgroundAlt = "",
  overlayClassName,
  backgroundImageClassName,
  ctaText,
  ctaLink,
  ctaOnClick,
  titleTestId,
  subtitleTestId,
}: SiteHeroProps) {
  const showCta = Boolean(ctaText && ctaLink);
  const [heroSrc, setHeroSrc] = useState(backgroundImage);

  useEffect(() => {
    setHeroSrc(backgroundImage);
  }, [backgroundImage]);

  const handleHeroError = () => {
    if (backgroundImageFallback && heroSrc !== backgroundImageFallback) {
      setHeroSrc(backgroundImageFallback);
    }
  };

  return (
    <section className="relative h-[60vh] w-full overflow-hidden">
      <img
        src={heroSrc}
        alt={backgroundAlt}
        onError={handleHeroError}
        className={`absolute inset-0 h-full w-full object-cover${backgroundImageClassName ? ` ${backgroundImageClassName}` : ""}`}
      />
      <div
        className={
          overlayClassName
            ? `absolute inset-0 z-[1] ${overlayClassName}`
            : "absolute inset-0 z-[1] bg-black/40"
        }
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        <h1
          className="max-w-4xl font-serif text-3xl font-bold leading-snug text-white sm:text-4xl md:text-5xl"
          data-testid={titleTestId}
        >
          {title}
        </h1>
        {subtitle ? (
          <p
            className="mt-4 max-w-2xl font-sans text-base font-light text-white/95 sm:text-lg"
            data-testid={subtitleTestId}
          >
            {subtitle}
          </p>
        ) : null}
        {showCta ? (
          <Link
            to={ctaLink!}
            onClick={ctaOnClick}
            className="mt-8 inline-block rounded-full bg-amber-600 px-8 py-3 font-sans font-semibold text-white transition hover:bg-amber-700"
          >
            {ctaText}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
