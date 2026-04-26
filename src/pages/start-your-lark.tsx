import React, { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/footer";
import SiteHero from "../components/SiteHero";
import {
  trackAddOnSelected,
  trackExperienceSelected,
  trackFormError,
  trackFormStart,
  trackFormSubmitAttempt,
  trackFormSubmitSuccess,
} from "../lib/analytics";

const FORMSPREE_ACTION = "https://formspree.io/f/mreygjya";

type IntakeType = "wellness" | "wedding" | "group" | "custom";
const TYPE_OPTIONS: Array<{ value: IntakeType; label: string }> = [
  { value: "wellness", label: "Wellness retreat" },
  { value: "wedding", label: "Micro wedding" },
  { value: "group", label: "Group getaway" },
  { value: "custom", label: "Not sure" },
];

const ADD_ON_GROUPS: Array<{ title: string; items: string[] }> = [
  {
    title: "Around the property",
    items: ["Paddleboards", "Pool setup", "Fire pit nights", "Garage hangout"],
  },
  {
    title: "Food & drink",
    items: ["BBQ dinner", "Charcuterie + wine", "Breakfast / brunch", "Stocked fridge"],
  },
  {
    title: "Local & adventure",
    items: ["Wine tour planning", "Golf day", "Dirt biking access", "Scooter / cruiser rides"],
  },
  {
    title: "Relaxation",
    items: ["Mobile massage", "Yoga session", "Chill day"],
  },
];

function parseType(param: string | null): IntakeType | null {
  if (param === "wellness" || param === "wedding" || param === "group" || param === "custom") {
    return param;
  }
  return null;
}

export default function StartYourLark() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const hasTrackedFormStartRef = useRef(false);

  const [selectedType, setSelectedType] = useState<IntakeType>(parseType(searchParams.get("type")) ?? "custom");
  const ctaSource = searchParams.get("source") ?? "";
  const selectedTypeLabel = TYPE_OPTIONS.find((option) => option.value === selectedType)?.label ?? "Not sure";

  const handleTypeSelect = (type: IntakeType) => {
    setSelectedType(type);
    const next = new URLSearchParams(searchParams);
    next.set("type", type);
    setSearchParams(next, { replace: true });
    trackExperienceSelected({
      selected_type: type,
      cta_source: ctaSource || undefined,
      action: "selected",
    });
  };

  const toggleAddOn = (item: string) => {
    setSelectedAddOns((prev) => {
      const isSelected = prev.includes(item);
      const next = isSelected ? prev.filter((entry) => entry !== item) : [...prev, item];
      trackAddOnSelected({
        add_on_name: item,
        action: isSelected ? "deselected" : "selected",
        selected_count: next.length,
        selected_type: selectedType,
        cta_source: ctaSource || undefined,
      });
      return next;
    });
  };

  const handleFormStart = () => {
    if (hasTrackedFormStartRef.current) return;
    hasTrackedFormStartRef.current = true;
    trackFormStart({
      selected_type: selectedType,
      cta_source: ctaSource || undefined,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    const formData = new FormData(e.currentTarget);
    const startDate = String(formData.get("startDate") ?? "").trim();
    const endDate = String(formData.get("endDate") ?? "").trim();
    const hasDates = Boolean(startDate || endDate);
    const addOnCount = selectedAddOns.length;

    trackFormSubmitAttempt({
      selected_type: selectedType,
      cta_source: ctaSource || undefined,
      has_add_ons: addOnCount > 0,
      add_on_count: addOnCount,
      has_dates: hasDates,
    });

    try {
      const response = await fetch(FORMSPREE_ACTION, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        trackFormError({
          selected_type: selectedType,
          cta_source: ctaSource || undefined,
          error_type: "non_ok_response",
          status: response.status,
        });
        setSubmitError(true);
        return;
      }
      trackFormSubmitSuccess({
        selected_type: selectedType,
        cta_source: ctaSource || undefined,
        has_add_ons: addOnCount > 0,
        add_on_count: addOnCount,
        has_dates: hasDates,
        status: response.status,
      });
      setSubmitted(true);
    } catch {
      trackFormError({
        selected_type: selectedType,
        cta_source: ctaSource || undefined,
        error_type: "network_or_exception",
      });
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SiteHero
        title="Start Your Lark"
        subtitle="A guided intake built around your plans."
        backgroundImage="/images/stays/outdoor.jpg"
        backgroundImageFallback="/images/pool/pool6.jpg"
        backgroundAlt="Outdoor stay at ELK Lark"
      />

      <section className="bg-stone-50 text-gray-800">
        <div className="mx-auto max-w-4xl px-6 pb-12 pt-12">
          <div className="mb-8">
            <p className="mb-3 text-sm font-medium text-gray-700">Choose your experience:</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {TYPE_OPTIONS.map((option) => {
                const isActive = selectedType === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleTypeSelect(option.value)}
                    className={`rounded-lg border px-4 py-3 text-left font-semibold transition ${
                      isActive
                        ? "border-amber-500 bg-amber-50 text-amber-800"
                        : "border-stone-200 bg-white text-gray-800 hover:border-amber-300"
                    }`}
                  >
                    {option.label === "Wellness retreat"
                      ? "Wellness Retreat"
                      : option.label === "Micro wedding"
                        ? "Micro Wedding"
                        : option.label === "Group getaway"
                          ? "Group Getaway"
                          : "Not Sure"}
                  </button>
                );
              })}
            </div>
          </div>

          <h2 className="mb-3 font-serif text-3xl font-bold md:text-4xl">Tell us what you&apos;re planning</h2>
          <p className="mb-8 max-w-2xl text-lg text-gray-600">
            Share a few details and we&apos;ll build your plan around the experience you selected.
          </p>

          <form
            onSubmit={onSubmit}
            onFocusCapture={handleFormStart}
            onChangeCapture={handleFormStart}
            className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <input type="hidden" name="selectedType" value={selectedType ?? ""} />
            <input type="hidden" name="ctaSource" value={ctaSource} />
            <input type="hidden" name="selectedAddOns" value={selectedAddOns.join(", ")} />
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="start-name" className="block text-sm font-medium text-gray-700">
                  Name<span className="ml-1 text-red-500">*</span>
                </label>
                <input
                  id="start-name"
                  required
                  name="name"
                  className="mt-2 rounded-lg border border-stone-300 px-4 py-3 w-full"
                />
              </div>
              <div>
                <label htmlFor="start-email" className="block text-sm font-medium text-gray-700">
                  Email<span className="ml-1 text-red-500">*</span>
                </label>
                <input
                  id="start-email"
                  required
                  type="email"
                  name="email"
                  className="mt-2 rounded-lg border border-stone-300 px-4 py-3 w-full"
                />
              </div>
              <label className="flex flex-col gap-2 text-sm font-medium">
                Phone
                <input name="phone" className="rounded-lg border border-stone-300 px-4 py-3" />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium">
                Experience
                <input
                  readOnly
                  name="planningType"
                  value={selectedTypeLabel}
                  className="rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 text-gray-700"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium">
                Group size
                <input
                  type="text"
                  name="groupSize"
                  placeholder="e.g. 4-6 people"
                  className="rounded-lg border border-stone-300 px-4 py-3"
                />
              </label>
              <div>
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                  Start date
                </label>
                <input
                  id="start-date"
                  type="date"
                  name="startDate"
                  className="mt-2 w-full rounded-lg border border-stone-300 px-4 py-3"
                />
              </div>
              <div>
                <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
                  End date
                </label>
                <input
                  id="end-date"
                  type="date"
                  name="endDate"
                  className="mt-2 w-full rounded-lg border border-stone-300 px-4 py-3"
                />
              </div>
              <p className="text-xs text-gray-500 md:col-span-2">Optional - helps us plan your stay</p>
            </div>

            <label className="mt-6 flex flex-col gap-2 text-sm font-medium">
              Notes
              <textarea
                name="notes"
                rows={5}
                placeholder="Share any priorities, must-haves, or questions."
                className="rounded-lg border border-stone-300 px-4 py-3"
              />
            </label>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-block rounded-full bg-amber-600 px-8 py-3 font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send My Plan"}
              </button>
            </div>

            {!submitted && !submitError ? (
              <p className="mt-4 text-sm text-gray-500">We&apos;ll follow up with next steps after reviewing your request.</p>
            ) : null}
            {submitted ? (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
                <p className="flex items-center gap-2 text-base font-semibold">
                  <span aria-hidden>✓</span>
                  You&apos;re in - we&apos;ll take it from here.
                </p>
                <p className="mt-2 text-sm">
                  We&apos;ll review your plan and follow up shortly with next steps.
                </p>
              </div>
            ) : null}
            {submitError ? (
              <p className="mt-4 text-sm text-red-700">Something went wrong. Please try again.</p>
            ) : null}
          </form>
        </div>
      </section>

      <section className="bg-stone-50 text-gray-800">
        <div className="mx-auto max-w-5xl px-6 pb-14 pt-10">
          <h3 className="mb-2 font-serif text-2xl font-bold">Popular add-ons & ideas</h3>
          <p className="mb-6 text-gray-600">Mention anything you like — we&apos;ll build it into your plan.</p>
          <div className="grid gap-6 md:grid-cols-2">
            {ADD_ON_GROUPS.map((group) => (
              <div key={group.title} className="rounded-xl border border-stone-200 bg-white p-5">
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-600">{group.title}</h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const isSelected = selectedAddOns.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleAddOn(item)}
                        className={`rounded-full border px-3 py-1.5 text-sm transition ${
                          isSelected
                            ? "border-amber-500 bg-amber-50 text-amber-800"
                            : "border-stone-300 bg-white text-gray-700 hover:border-amber-300"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
