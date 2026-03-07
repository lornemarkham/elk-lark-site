import React from "react";
import { Link } from "react-router-dom";

export type SignaturePackageCardProps = {
  title: string;
  price: string;
  includes: string[];
  description?: string;
  ctaLabel?: string;
  ctaTo: string;
  onAddToSelection?: (item: { title: string; price: string; type: "package" }) => void;
  isSelected?: boolean;
};

export default function SignaturePackageCard({
  title,
  price,
  includes,
  description,
  ctaLabel = "Plan This Package",
  ctaTo,
  onAddToSelection,
  isSelected = false,
}: SignaturePackageCardProps) {
  const handleCtaClick = () => {
    onAddToSelection?.({ title, price, type: "package" });
  };

  return (
    <article
      className={`flex flex-col rounded-xl border shadow-sm overflow-hidden transition-all duration-200 ${
        isSelected
          ? "border-amber-500 bg-amber-50/60 hover:shadow-md"
          : "border-stone-200 bg-white hover:shadow-md"
      }`}
    >
      <div className="p-6 sm:p-8 flex flex-col flex-1">
        <h3 className="font-serif text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-amber-600 font-semibold mb-4">{price}</p>
        {description && (
          <p className="text-gray-600 text-sm mb-4">{description}</p>
        )}
        <div className="mb-6">
          <p className="text-sm font-semibold text-stone-700 mb-2">Includes</p>
          <ul className="space-y-1.5">
            {includes.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-amber-600 mt-0.5 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        {onAddToSelection ? (
          <button
            type="button"
            onClick={handleCtaClick}
            className={`mt-auto inline-block text-center px-5 py-3 rounded-full font-semibold transition w-full ${
              isSelected
                ? "bg-stone-200 text-stone-600 cursor-default"
                : "bg-amber-600 hover:bg-amber-700 text-white"
            }`}
          >
            {isSelected ? "Selected" : ctaLabel}
          </button>
        ) : (
          <Link
            to={ctaTo}
            className="mt-auto inline-block text-center px-5 py-3 rounded-full font-semibold bg-amber-600 hover:bg-amber-700 text-white transition"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </article>
  );
}
