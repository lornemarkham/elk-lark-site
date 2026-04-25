// src/components/SeasonToggle.tsx
import { Snowflake, Sun } from "lucide-react";
import { useMemo } from "react";
import { useSeason } from "../state/SeasonContext";

type Variant = "pill" | "icon" | "segmented" | "chip" | "underline";
type Size = "sm" | "md";

const SUN_CLASS = "h-4 w-4 shrink-0 text-amber-700";
const SNOW_CLASS = "h-4 w-4 shrink-0 text-sky-600";

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

  const sizing = useMemo(() => {
    return size === "sm"
      ? { pill: "h-7 text-xs", knob: "h-5 w-5", seg: "text-xs", chip: "px-2 py-1 text-[11px]" }
      : { pill: "h-8 text-sm", knob: "h-6 w-6", seg: "text-sm", chip: "px-3 py-1.5 text-xs" };
  }, [size]);

  const toggle = () => setSeason(next as "winter" | "summer");

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
        <span className="flex w-full justify-between items-center px-3 z-10 font-medium">
          <Sun className={isWinter ? "text-gray-400" : SUN_CLASS} aria-hidden />
          <span className={isWinter ? "text-gray-800" : "text-gray-900"}>
            {isWinter ? "Winter" : "Summer"}
          </span>
          <Snowflake className={isWinter ? SNOW_CLASS : "text-gray-400"} aria-hidden />
        </span>
      </button>
    );
  }

  if (variant === "icon") {
    return (
      <button
        onClick={toggle}
        aria-label={`Switch to ${next}`}
        title={`${label} — click for ${next}`}
        className={`inline-flex items-center justify-center rounded-full border border-black/10 shadow-sm
                    bg-white/80 backdrop-blur hover:bg-white transition ${size === "sm" ? "h-8 w-8" : "h-10 w-10"} ${className}`}
      >
        {isWinter ? (
          <Snowflake className="h-5 w-5 text-gray-700 animate-[pulse_2s_ease-in-out_infinite]" aria-hidden />
        ) : (
          <Sun className="h-5 w-5 text-amber-700" aria-hidden />
        )}
      </button>
    );
  }

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
          className={`inline-flex items-center justify-center gap-1 px-3 ${sizing.seg} rounded-full transition ${
            !isWinter ? "bg-amber-500 text-white" : "text-gray-800 hover:bg-black/5"
          }`}
        >
          <Sun className="h-4 w-4 shrink-0" aria-hidden />
          Summer
        </button>
        <button
          role="tab"
          aria-selected={isWinter}
          onClick={() => setSeason("winter")}
          className={`inline-flex items-center justify-center gap-1 px-3 ${sizing.seg} rounded-full transition ${
            isWinter ? "bg-sky-600 text-white" : "text-gray-800 hover:bg-black/5"
          }`}
        >
          <Snowflake className="h-4 w-4 shrink-0" aria-hidden />
          Winter
        </button>
      </div>
    );
  }

  if (variant === "chip") {
    return (
      <button
        onClick={toggle}
        className={`inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/80 backdrop-blur shadow-sm
                    hover:bg-white transition ${sizing.chip} ${className}`}
        title={`Switch to ${next}`}
      >
        {isWinter ? (
          <Snowflake className="h-4 w-4 shrink-0 text-gray-700" aria-hidden />
        ) : (
          <Sun className="h-4 w-4 shrink-0 text-amber-800" aria-hidden />
        )}
        <span className={isWinter ? "text-gray-800 font-medium" : "text-gray-900 font-medium"}>
          {label}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      className={`group inline-flex items-center gap-1 text-sm ${className}`}
      title={`Switch to ${next}`}
    >
      {isWinter ? (
        <Snowflake className="h-4 w-4 shrink-0 text-gray-700 opacity-80" aria-hidden />
      ) : (
        <Sun className="h-4 w-4 shrink-0 text-amber-700 opacity-80" aria-hidden />
      )}
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
