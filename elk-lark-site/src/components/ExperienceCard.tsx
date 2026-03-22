import React from "react";
import { Link } from "react-router-dom";

export type ExperienceCardProps = {
  title: string;
  description: string;
  price: string;
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

export default function ExperienceCard({
  title,
  description,
  price,
  ctaLabel,
  ctaTo,
  accentColor = "accent",
}: ExperienceCardProps) {
  return (
    <article className="flex flex-col rounded-xl border border-stone-200 bg-white shadow-sm overflow-hidden transition-shadow hover:shadow-md">
      <div className="p-6 sm:p-8 flex flex-col flex-1">
        <h3 className="font-serif text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-amber-600 font-semibold mb-3">{price}</p>
        <p className="text-gray-600 mb-6 flex-1">{description}</p>
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
