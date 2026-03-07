/**
 * Reusable section title block: separator, 24px, title, 20px, separator.
 * Keeps separators and title as one tight, symmetrical visual unit.
 * Same width logic for both separators.
 */
import SectionSeparator from "./SectionSeparator";

type SectionTitleBlockProps = {
  title: React.ReactNode;
  variant?: "light" | "orange";
  className?: string;
  titleClassName?: string;
};

export default function SectionTitleBlock({
  title,
  variant = "light",
  className = "",
  titleClassName = "",
}: SectionTitleBlockProps) {
  return (
    <div className={`text-center ${className}`.trim()} role="presentation">
      <SectionSeparator variant={variant} />
      <h2
        className={`mt-[24px] mb-[20px] font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white ${titleClassName}`.trim()}
      >
        {title}
      </h2>
    </div>
  );
}
