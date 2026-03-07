import React from "react";
import { Link } from "react-router-dom";

export type AddOnCardProps = {
  title: string;
  description: string;
  price: string;
  ctaLabel: string;
  ctaTo: string;
  onAddToSelection?: (item: { title: string; price: string; type: "add-on" }) => void;
  onRemoveFromSelection?: () => void;
  isSelected?: boolean;
};

export default function AddOnCard({
  title,
  description,
  price,
  ctaLabel,
  ctaTo,
  onAddToSelection,
  onRemoveFromSelection,
  isSelected = false,
}: AddOnCardProps) {
  const handleAddClick = () => {
    onAddToSelection?.({ title, price, type: "add-on" });
  };

  const handleRemoveClick = () => {
    onRemoveFromSelection?.();
  };

  const showRemove = isSelected && onRemoveFromSelection;

  return (
    <article
      className={`flex flex-col rounded-xl border shadow-sm overflow-hidden transition-all duration-200 p-5 ${
        isSelected
          ? "border-amber-500 bg-amber-50/60 hover:shadow-md"
          : "border-stone-200 bg-white hover:shadow-md"
      }`}
    >
      <h3 className="font-serif text-lg font-bold text-gray-800 mb-1">{title}</h3>
      <p className="text-amber-600 font-semibold text-sm mb-2">{price}</p>
      <p className="text-gray-600 text-sm mb-4 flex-1">{description}</p>
      {onAddToSelection || showRemove ? (
        <button
          type="button"
          onClick={showRemove ? handleRemoveClick : handleAddClick}
          className={`inline-block text-center px-4 py-2 rounded-full font-semibold text-sm transition w-full ${
            showRemove
              ? "border border-stone-300 bg-white text-stone-600 hover:bg-stone-50"
              : isSelected
                ? "bg-stone-200 text-stone-600 cursor-default"
                : "bg-amber-600 hover:bg-amber-700 text-white"
          }`}
        >
          {showRemove ? "Remove" : isSelected ? "Added" : ctaLabel}
        </button>
      ) : (
        <Link
          to={ctaTo}
          className="inline-block text-center px-4 py-2 rounded-full font-semibold text-sm bg-amber-600 hover:bg-amber-700 text-white transition"
        >
          {ctaLabel}
        </Link>
      )}
    </article>
  );
}
