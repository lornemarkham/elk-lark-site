import React, { useState, useMemo, useEffect } from "react";
import Footer from "../components/footer";
import SignaturePackageCard from "../components/SignaturePackageCard";
import AddOnCard from "../components/AddOnCard";

const INQUIRY_ANCHOR = "/guest-experiences#inquiry-form";
const FORMSPREE_ACTION = "https://formspree.io/f/mreygjya";

type SelectedItem = {
  id: string;
  title: string;
  price: string;
  type: "package" | "add-on";
};

function selectedItemsToInterestedIn(items: SelectedItem[]): string {
  return items.map((i) => `${i.title} — ${i.price}`).join("\n");
}

const SIGNATURE_PACKAGES = [
  {
    title: "Welcome to Elk Lark Package",
    price: "$95",
    includes: [
      "Charcuterie board",
      "Bottle of wine",
      "Chocolate treats",
      "Local snacks",
    ],
  },
  {
    title: "Elk Lark Sunset Experience",
    price: "$145",
    includes: [
      "Charcuterie board",
      "Bottle of wine",
      "Fire pit setup",
      "S'mores kit",
    ],
  },
  {
    title: "Lake Adventure Package",
    price: "$120",
    includes: ["2 paddleboards for the day", "Picnic lunch"],
    description: "Perfect for enjoying Kalamalka Lake.",
  },
  {
    title: "Romance Package",
    price: "$135",
    includes: [
      "Champagne",
      "Chocolate covered strawberries",
      "Candles",
      "Small bouquet of flowers",
    ],
  },
  {
    title: "Birthday Celebration Package",
    price: "$95",
    includes: [
      "Cake or cupcakes",
      "Balloons",
      "Bottle of wine",
    ],
  },
];

const ADD_ON_CATEGORY_ORDER = [
  "Outdoor Adventures",
  "Food & Drink Experiences",
  "BBQ Experience",
  "Special Touches",
  "Convenience",
];

const ADD_ONS = [
  {
    category: "Outdoor Adventures",
    title: "Paddleboard Rental",
    price: "$50 / board / day",
    description: "Enjoy the lake with one of our paddleboards.",
  },
  {
    category: "Outdoor Adventures",
    title: "Electric Scooter Rental",
    price: "$50 / scooter / day",
    description: "Explore the area easily with our electric scooters.",
  },
  {
    category: "Food & Drink Experiences",
    title: "Picnic Lunch",
    price: "$25 per person",
    description: "Sandwiches, fruit, snacks, and drinks for your lake day.",
  },
  {
    category: "Food & Drink Experiences",
    title: "Charcuterie & Wine by the Pool",
    price: "$85",
    description: "A beautiful charcuterie board with meats, cheeses, crackers, fruit, and wine.",
  },
  {
    category: "Food & Drink Experiences",
    title: "Mexican Fiesta Night",
    price: "$30 per person",
    description: "A fun taco night by the pool with all the fixings.",
  },
  {
    category: "BBQ Experience",
    title: "Outlaw BBQ Kit",
    price: "$35 per person",
    description: "We prepare everything so you can fire up the grill yourself.",
  },
  {
    category: "BBQ Experience",
    title: "Fully Prepared BBQ Dinner",
    price: "$45 per person",
    description: "Dinner prepared and delivered ready to enjoy.",
  },
  {
    category: "Special Touches",
    title: "Chocolate Covered Strawberries & Champagne",
    price: "$75",
    description: "A romantic welcome waiting for you on arrival.",
  },
  {
    category: "Special Touches",
    title: "Poolside Chill Basket",
    price: "$39",
    description: "Chips, salsa, fruit, sparkling water, and sweet treats.",
  },
  {
    category: "Special Touches",
    title: "Sunset Wine Basket",
    price: "$69",
    description: "Wine, cheese, crackers, fruit, and chocolates for sunset relaxation.",
  },
  {
    category: "Convenience",
    title: "Pre-Arrival Grocery Shopping",
    price: "$50 service fee",
    description: "Send us your grocery list and arrive to a stocked fridge.",
  },
];

const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  phone: "",
  preferredDates: "",
  guestCount: "",
  interestedIn: "",
  notes: "",
};

export default function GuestExperiences() {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  useEffect(() => {
    setFormData((f) => ({ ...f, interestedIn: selectedItemsToInterestedIn(selectedItems) }));
  }, [selectedItems]);

  const addToSelection = (item: { title: string; price: string; type: "package" | "add-on" }) => {
    const id = `${item.type}-${item.title}`;
    const newItem: SelectedItem = { id, title: item.title, price: item.price, type: item.type };

    setSelectedItems((prev) => {
      if (item.type === "package") {
        // Only one package: replace any existing package with the new one; keep all add-ons
        const addOnsOnly = prev.filter((i) => i.type === "add-on");
        return [...addOnsOnly, newItem];
      }
      // Add-on: allow multiple, prevent duplicates
      if (prev.some((i) => i.id === id)) return prev;
      return [...prev, newItem];
    });
  };

  const removeFromSelection = (id: string) => {
    setSelectedItems((prev) => prev.filter((i) => i.id !== id));
  };

  const addOnsByCategory = useMemo(() => {
    const map = new Map<string, typeof ADD_ONS>();
    for (const addOn of ADD_ONS) {
      const list = map.get(addOn.category) ?? [];
      list.push(addOn);
      map.set(addOn.category, list);
    }
    return ADD_ON_CATEGORY_ORDER.map((cat) => ({ category: cat, items: map.get(cat) ?? [] })).filter(
      (g) => g.items.length > 0
    );
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ACTION, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartAnotherRequest = () => {
    setSubmitted(false);
    setSubmitError(false);
    setFormData(INITIAL_FORM_DATA);
    setSelectedItems([]);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative h-72 w-full overflow-hidden bg-stone-800">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80"
          alt="Okanagan valley"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 z-[1]" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold font-serif mb-3">
            Guest Experiences & Add-Ons
          </h1>
          <p className="text-white/95 text-lg md:text-xl max-w-2xl font-light">
            Make your stay even more memorable by adding curated adventures, meals, and special
            touches during your time at Elk Lark.
          </p>
          <a
            href="#inquiry-form"
            className="mt-8 inline-block bg-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-700 transition shadow-md"
          >
            Start Your Lark
          </a>
        </div>
      </section>

      {/* Signature Elk Lark Packages */}
      <section className="bg-stone-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
            Signature Elk Lark Packages
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SIGNATURE_PACKAGES.map((pkg, i) => (
              <SignaturePackageCard
                key={i}
                title={pkg.title}
                price={pkg.price}
                includes={pkg.includes}
                description={pkg.description}
                ctaLabel="Plan This Package"
                ctaTo={INQUIRY_ANCHOR}
                onAddToSelection={addToSelection}
                isSelected={selectedItems.some(
                  (i) => i.type === "package" && i.title === pkg.title
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Individual Add-Ons */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
            Individual Add-Ons
          </h2>
          {addOnsByCategory.map(({ category, items }) => (
            <div key={category} className="mb-14 last:mb-0">
              <h3 className="font-serif text-xl font-bold text-gray-800 mb-6">{category}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((addOn, i) => {
                  const isAddOnSelected = selectedItems.some(
                    (item) => item.type === "add-on" && item.title === addOn.title
                  );
                  return (
                    <AddOnCard
                      key={`${category}-${i}`}
                      title={addOn.title}
                      description={addOn.description}
                      price={addOn.price}
                      ctaLabel="Add to My Stay"
                      ctaTo={INQUIRY_ANCHOR}
                      onAddToSelection={addToSelection}
                      onRemoveFromSelection={
                        isAddOnSelected
                          ? () => removeFromSelection(`add-on-${addOn.title}`)
                          : undefined
                      }
                      isSelected={isAddOnSelected}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Build Your Elk Lark Experience */}
      <section className="bg-stone-100 py-16 px-6 text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Build Your Elk Lark Experience
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          Every stay at Elk Lark can be customized. Choose from our curated packages and add-ons or
          request something special for your visit.
        </p>
        <a
          href="#inquiry-form"
          className="inline-block bg-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-700 transition"
        >
          Tell Us What You&apos;re Thinking
        </a>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry-form" className="bg-white py-20 px-6 scroll-mt-20">
        <div className="max-w-2xl mx-auto">
          {selectedItems.length > 0 && (() => {
            const selectedPackage = selectedItems.find((i) => i.type === "package");
            const selectedAddOns = selectedItems.filter((i) => i.type === "add-on");
            return (
              <div className="mb-10 rounded-xl border border-stone-200 bg-stone-50 p-6 shadow-sm">
                <h3 className="font-serif text-xl font-bold text-gray-800 mb-3">
                  Your Selected Experience
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Review your selections below. Remove any item before submitting.
                </p>
                {selectedPackage && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-stone-700 mb-2">Selected Package</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm">
                        <span>
                          {selectedPackage.title}{" "}
                          <span className="text-amber-600">— {selectedPackage.price}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromSelection(selectedPackage.id)}
                          className="ml-0.5 rounded-full p-0.5 text-stone-400 hover:bg-stone-100 hover:text-gray-700 transition"
                          aria-label={`Remove ${selectedPackage.title}`}
                        >
                          <span className="sr-only">Remove</span>
                          <span aria-hidden>×</span>
                        </button>
                      </span>
                    </div>
                  </div>
                )}
                {selectedAddOns.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-stone-700 mb-2">Add-Ons</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAddOns.map((item) => (
                        <span
                          key={item.id}
                          className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm"
                        >
                          <span>
                            {item.title} <span className="text-amber-600">— {item.price}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFromSelection(item.id)}
                            className="ml-0.5 rounded-full p-0.5 text-stone-400 hover:bg-stone-100 hover:text-gray-700 transition"
                            aria-label={`Remove ${item.title}`}
                          >
                            <span className="sr-only">Remove</span>
                            <span aria-hidden>×</span>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
          <h2 className="font-serif text-3xl font-bold text-gray-800 text-center mb-4">
            Plan Your Stay
          </h2>
          {submitted && (
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-8 shadow-sm text-center">
              <h3 className="font-serif text-2xl font-bold text-gray-800 mb-3">
                Thanks! Your Elk Lark experience request has been received.
              </h3>
              <p className="text-gray-600 mb-6">
                We&apos;ll be in touch shortly from info@elklark.com to help plan your stay.
              </p>
              <button
                type="button"
                onClick={handleStartAnotherRequest}
                className="inline-block px-8 py-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-semibold transition"
              >
                Start Another Request
              </button>
            </div>
          )}
          {submitError && (
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-8 shadow-sm text-center">
              <p className="text-gray-800 mb-4">
                Something went wrong. Please try again or email info@elklark.com.
              </p>
              <button
                type="button"
                onClick={() => setSubmitError(false)}
                className="inline-block px-8 py-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-semibold transition"
              >
                Try Again
              </button>
            </div>
          )}
          {!submitted && !submitError && (
            <>
              <p className="text-gray-600 text-center mb-10 max-w-xl mx-auto leading-relaxed">
                Tell us what you&apos;re thinking and we&apos;ll help shape the right ELK Lark
                experience for you.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <input type="hidden" name="_subject" value="New Elk Lark Experience Request" />
                <input type="hidden" name="_replyto" value="info@elklark.com" />
                <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-1">
                Name <span className="text-amber-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-white text-gray-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-1">
                Email <span className="text-amber-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-white text-gray-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-1">
                Phone <span className="text-gray-400 text-xs">(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-white text-gray-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="preferredDates" className="block text-sm font-semibold text-gray-800 mb-1">
                Preferred dates
              </label>
              <input
                type="text"
                id="preferredDates"
                name="preferredDates"
                placeholder="e.g. June 15–18, or flexible"
                value={formData.preferredDates}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-white text-gray-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="guestCount" className="block text-sm font-semibold text-gray-800 mb-1">
                Number of guests
              </label>
              <input
                type="text"
                id="guestCount"
                name="guestCount"
                placeholder="e.g. 4 adults, 2 kids"
                value={formData.guestCount}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-white text-gray-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="interestedIn" className="block text-sm font-semibold text-gray-800 mb-1">
                Interested in packages or add-ons
              </label>
              <textarea
                id="interestedIn"
                name="interestedIn"
                rows={3}
                placeholder="Select packages and add-ons above, or type here"
                value={formData.interestedIn}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-white text-gray-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition resize-y"
              />
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-semibold text-gray-800 mb-1">
                Additional notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                placeholder="Anything else we should know?"
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-white text-gray-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition resize-y"
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-semibold transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending…" : "Plan My Elk Lark Stay"}
              </button>
            </div>
          </form>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
