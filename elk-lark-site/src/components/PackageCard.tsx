import React from "react";
import { Link } from "react-router-dom";

export type PackageCardProps = {
  title: string;
  description: string;
  whoItIsFor: string;
  highlights: string[];
  ctaLabel: string;
  ctaTo: string;
  accentColor?: "restore" | "accent" | "strategy" | "brand";
};

const accentClasses = {
  restore: "bg-restore hover:bg-restore/90 text-white",
  accent: "bg-accent hover:bg-amber-600 text-white",
  strategy: "bg-strategy hover:bg-strategy/90 text-white",
  brand: "bg-brand hover:bg-brand/90 text-white",
};

export default function PackageCard({
  title,
  description,
  whoItIsFor,
  highlights,
  ctaLabel,
  ctaTo,
  accentColor = "accent",
}: PackageCardProps) {
  return (
    <article className="flex flex-col rounded-xl border border-stone-200 bg-white shadow-sm overflow-hidden transition-shadow hover:shadow-md">
      <div className="p-6 sm:p-8 flex flex-col flex-1">
        <h3 className="font-serif text-2xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4 flex-1">{description}</p>
        <p className="text-sm font-semibold text-stone-700 mb-2">Perfect for</p>
        <p className="text-gray-600 text-sm mb-4">{whoItIsFor}</p>
        <div className="mb-6">
          <p className="text-sm font-semibold text-stone-700 mb-2">Highlights</p>
          <ul className="space-y-1.5">
            {highlights.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-amber-600 mt-0.5 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <Link
          to={ctaTo}
          className={`inline-block text-center px-5 py-3 rounded-full font-semibold transition ${accentClasses[accentColor]}`}
        >
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}
