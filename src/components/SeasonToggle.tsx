// src/components/SeasonToggle.tsx
import { useSeason } from "../state/SeasonContext";
import { useMemo } from "react";

type Variant = "pill" | "icon" | "segmented" | "chip" | "underline";
type Size = "sm" | "md";

export default function SeasonToggle({
  variant = "pill",
  size = "sm",
  className = "",
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  const { season, setSeason } = useSeason();
  const isWinter = season === "winter";
  const next = isWinter ? "summer" : "winter";
  const label = isWinter ? "Winter" : "Summer";
  const icon = isWinter ? "❄️" : "☀️";

  const sizing = useMemo(() => {
    return size === "sm"
      ? { pill: "h-7 text-xs", knob: "h-5 w-5", seg: "text-xs", chip: "px-2 py-1 text-[11px]" }
      : { pill: "h-8 text-sm", knob: "h-6 w-6", seg: "text-sm", chip: "px-3 py-1.5 text-xs" };
  }, [size]);

  const toggle = () => setSeason(next as "winter" | "summer");

  // 🌞 Pill variant
  if (variant === "pill") {
    return (
      <button
        onClick={toggle}
        role="switch"
        aria-checked={isWinter}
        title={`Switch to ${next}`}
        className={`relative inline-flex items-center ${sizing.pill} w-28 rounded-full border border-black/10 bg-white/80 backdrop-blur
                    shadow-sm hover:bg-white transition-colors ${className}`}
      >
        <span
          className={`absolute inset-y-0 my-auto ${sizing.knob} rounded-full shadow
                      transition-all duration-200 ease-out
                      ${isWinter ? "translate-x-[calc(100%-0.25rem)] bg-sky-600" : "translate-x-1 bg-amber-500"}`}
        />
        <span className="flex w-full justify-between px-3 z-10 font-medium">
          <span className={isWinter ? "text-gray-600" : "text-amber-900"}>☀️</span>
          <span className={isWinter ? "text-gray-800" : "text-gray-900"}>
            {isWinter ? "Winter" : "Summer"}
          </span>
          <span className={isWinter ? "text-gray-600" : "text-black/70"}>❄️</span>
        </span>
      </button>
    );
  }

  // 🌞 Icon variant
  if (variant === "icon") {
    return (
      <button
        onClick={toggle}
        aria-label={`Switch to ${next}`}
        title={`${label} — click for ${next}`}
        className={`inline-flex items-center justify-center rounded-full border border-black/10 shadow-sm
                    bg-white/80 backdrop-blur hover:bg-white transition ${size === "sm" ? "h-8 w-8" : "h-10 w-10"} ${className}`}
      >
        <span
          className={`${isWinter ? "text-gray-700 animate-[pulse_2s_ease-in-out_infinite]" : "text-amber-700"}`}
        >
          {icon}
        </span>
      </button>
    );
  }

  // 🌞 Segmented variant
  if (variant === "segmented") {
    return (
      <div
        className={`inline-flex rounded-full border border-black/10 bg-white/80 backdrop-blur p-0.5 shadow-sm ${className}`}
        role="tablist"
        aria-label="Season selector"
      >
        <button
          role="tab"
          aria-selected={!isWinter}
          onClick={() => setSeason("summer")}
          className={`px-3 ${sizing.seg} rounded-full transition ${
            !isWinter
              ? "bg-amber-500 text-white"
              : "text-gray-800 hover:bg-black/5"
          }`}
        >
          ☀️ Summer
        </button>
        <button
          role="tab"
          aria-selected={isWinter}
          onClick={() => setSeason("winter")}
          className={`px-3 ${sizing.seg} rounded-full transition ${
            isWinter
              ? "bg-sky-600 text-white"
              : "text-gray-800 hover:bg-black/5"
          }`}
        >
          ❄️ Winter
        </button>
      </div>
    );
  }

  // 🌞 Chip variant
  if (variant === "chip") {
    return (
      <button
        onClick={toggle}
        className={`inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/80 backdrop-blur shadow-sm
                    hover:bg-white transition ${sizing.chip} ${className}`}
        title={`Switch to ${next}`}
      >
        <span className={isWinter ? "text-gray-700" : "text-amber-800"}>{icon}</span>
        <span className={isWinter ? "text-gray-800 font-medium" : "text-gray-900 font-medium"}>
          {label}
        </span>
      </button>
    );
  }

  // 🌞 Underline variant
  return (
    <button
      onClick={toggle}
      className={`group inline-flex items-center gap-1 text-sm ${className}`}
      title={`Switch to ${next}`}
    >
      <span className={isWinter ? "text-gray-700 opacity-80" : "text-amber-700 opacity-80"}>
        {icon}
      </span>
      <span
        className={`relative font-medium ${
          isWinter ? "text-gray-800" : "text-gray-900"
        }`}
      >
        {label}
        <span className="block h-[2px] w-0 bg-current transition-all group-hover:w-full" />
      </span>
    </button>
  );
}