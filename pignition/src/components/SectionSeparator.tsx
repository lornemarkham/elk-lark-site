/**
 * Single site-wide separator: centered star + thin horizontal lines that fade outward.
 * Two variants only: light (neutral) and orange (brand accent).
 */
type SectionSeparatorProps = {
  variant?: "light" | "orange";
  className?: string;
};

export default function SectionSeparator({
  variant = "light",
  className = "",
}: SectionSeparatorProps) {
  const lineClass =
    variant === "orange"
      ? "section-separator-line section-separator-line-orange"
      : "section-separator-line section-separator-line-light";
  const starClass =
    variant === "orange"
      ? "section-separator-star section-separator-star-orange"
      : "section-separator-star section-separator-star-light";

  return (
    <div
      className={`section-separator ${className}`}
      role="presentation"
      aria-hidden
    >
      <span className={lineClass} data-side="left" />
      <span className={starClass}>★</span>
      <span className={lineClass} data-side="right" />
    </div>
  );
}
