import { useState } from "react";

/**
 * Bullet-hole decal — distressed poster/sticker style.
 * Use PNG assets from /images/decals/ when available; fallback is a rugged circular decal (no windshield crack).
 */
const DECAL_ASSETS = [
  "/images/decals/bullet-hole-1.png",
  "/images/decals/bullet-hole-2.png",
  "/images/decals/bullet-hole-3.png",
] as const;

type BulletHoleDecalProps = {
  size?: number;
  opacity?: number;
  /** Use PNG from public: 1, 2, or 3. Omit for fallback SVG. */
  variant?: 1 | 2 | 3;
  /** Direct image path (overrides variant). */
  src?: string;
  className?: string;
  "aria-hidden"?: boolean;
};

export default function BulletHoleDecal({
  size = 64,
  opacity = 0.5,
  variant,
  src,
  className = "",
  "aria-hidden": ariaHidden = true,
}: BulletHoleDecalProps) {
  const imageSrc = src ?? (variant ? DECAL_ASSETS[variant - 1] : null);
  const [useFallback, setUseFallback] = useState(!imageSrc);

  return (
    <span
      className={`pointer-events-none select-none block ${className}`}
      aria-hidden={ariaHidden}
      style={{ opacity, width: size, height: size }}
    >
      {imageSrc && !useFallback ? (
        <img
          src={imageSrc}
          alt=""
          width={size}
          height={size}
          className="w-full h-full object-contain"
          loading="lazy"
          onError={() => setUseFallback(true)}
        />
      ) : (
        <FallbackDecalSVG size={size} />
      )}
    </span>
  );
}

/** Fallback: dark circular impact with distressed ring only — not windshield crack. */
function FallbackDecalSVG({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block w-full h-full"
    >
      {/* Outer distressed ring — thick, rough */}
      <circle cx="16" cy="16" r="12" fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="2.5" />
      <circle cx="16" cy="16" r="10" fill="none" stroke="rgba(60,50,45,0.8)" strokeWidth="1.2" />
      {/* Dark hole */}
      <circle cx="16" cy="16" r="5.5" fill="rgba(0,0,0,0.85)" />
      <circle cx="16" cy="16" r="3.5" fill="rgba(20,18,16,0.9)" />
    </svg>
  );
}

export { DECAL_ASSETS };
