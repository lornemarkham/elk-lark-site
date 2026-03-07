import { useEffect, useRef, useState } from "react";

type ScrollRevealDecalProps = {
  children: React.ReactNode;
  /** Delay in ms (keep short for quick reveal) */
  delay?: number;
  /** Root margin for intersection (e.g. "0px 0px -80px 0px" to trigger when 80px into view) */
  rootMargin?: string;
  className?: string;
};

export default function ScrollRevealDecal({
  children,
  delay = 0,
  rootMargin = "0px 0px -40px 0px",
  className = "",
}: ScrollRevealDecalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal-decal ${visible ? "scroll-reveal-decal-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
