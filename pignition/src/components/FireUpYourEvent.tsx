import { useState } from "react";
import BulletHoleDecal from "./BulletHoleDecal";
import ScrollRevealDecal from "./ScrollRevealDecal";
import SectionTitleBlock from "./SectionTitleBlock";

const EVENT_TYPES = [
  "Backyard / private party",
  "Wedding",
  "Corporate / work event",
  "Pop-up / festival",
  "Other",
];

/** Same Formspree form as ELK Lark; set VITE_FORMSPREE_FORM_ID in .env to the ELK Lark form ID. */
const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID as string | undefined;

export default function FireUpYourEvent() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    location: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSubmitError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!FORMSPREE_FORM_ID) return;
    setSubmitting(true);
    setSubmitError(false);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site: "Pignition",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          eventType: formData.eventType,
          eventDate: formData.eventDate,
          guestCount: formData.guestCount,
          location: formData.location,
          message: formData.message,
        }),
      });
      if (!res.ok) throw new Error("Submit failed");
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="fire-up-your-event"
      className="relative py-6 sm:py-8 px-4 sm:px-6 overflow-hidden scroll-mt-6"
    >
      <ScrollRevealDecal delay={0} className="absolute top-8 left-6 sm:left-10 z-20">
        <BulletHoleDecal variant={2} size={60} opacity={0.42} />
      </ScrollRevealDecal>
      <ScrollRevealDecal delay={25} className="absolute bottom-10 right-6 sm:right-10 z-20">
        <BulletHoleDecal variant={1} size={44} opacity={0.3} />
      </ScrollRevealDecal>
      <div className="absolute inset-0 bg-charcoal" />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(194,65,12,0.06) 0%, transparent 60%), linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        <SectionTitleBlock title="Fire Up Your Event" className="mb-4" />
        <p className="text-stone-400 text-center text-lg mb-6">
          Pop-ups. Catering. Backyard burns. Tell us what you're planning.
        </p>

        {submitted ? (
          <div className="text-center py-12 px-6 rounded-sm border border-stone-600/80 bg-stone-900/40">
            <p className="text-[#f5f0e8] font-display text-xl uppercase tracking-tight">
              Thanks. We'll get back to you soon.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            action={FORMSPREE_FORM_ID ? `https://formspree.io/f/${FORMSPREE_FORM_ID}` : undefined}
            method="POST"
            className="space-y-4"
          >
            <input type="hidden" name="site" value="Pignition" />
            {submitError && (
              <p className="text-amber-600/90 text-sm">
                Something went wrong. Please try again or email us directly.
              </p>
            )}
            <p className="text-stone-500 text-xs">* Required</p>
            <div>
              <label htmlFor="name" className="block text-stone-400 text-sm font-medium mb-1.5">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="pignition-form-field"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-stone-400 text-sm font-medium mb-1.5">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="pignition-form-field"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-stone-400 text-sm font-medium mb-1.5">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="pignition-form-field"
                placeholder="(250) 555-0123"
              />
            </div>
            <div>
              <label htmlFor="eventType" className="block text-stone-400 text-sm font-medium mb-1.5">
                Event Type
              </label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="pignition-form-field"
              >
                <option value="">Select event type</option>
                {EVENT_TYPES.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="eventDate" className="block text-stone-400 text-sm font-medium mb-1.5">
                Event Date
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className="pignition-form-field"
              />
            </div>
            <div>
              <label htmlFor="guestCount" className="block text-stone-400 text-sm font-medium mb-1.5">
                Guest Count
              </label>
              <input
                type="text"
                id="guestCount"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                className="pignition-form-field"
                placeholder="e.g. 50"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-stone-400 text-sm font-medium mb-1.5">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="pignition-form-field"
                placeholder="City or venue"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-stone-400 text-sm font-medium mb-1.5">
                Tell Us About Your Event
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="pignition-form-field"
                placeholder="What are you thinking? Dates, vibe, dietary needs..."
              />
            </div>
            <div className="pt-8">
              <button
                type="submit"
                disabled={submitting || !FORMSPREE_FORM_ID}
                className="btn-primary w-full px-8 py-5 bg-flame text-white font-bold text-lg uppercase tracking-[0.2em] rounded-sm border-2 border-flame shadow-lg hover:bg-flame/90 hover:border-stone-400/50 hover:shadow-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                FIRE IT UP
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
