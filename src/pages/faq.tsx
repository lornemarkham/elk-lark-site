import React, { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { CalendarDays, Compass, House, Info, Map } from "lucide-react";
import Footer from "../components/footer";
import SiteHero from "../components/SiteHero";

const FAQ_SECTION_ICON = "h-5 w-5 shrink-0 text-amber-600";

export default function FAQ() {
  return (
    <>
      <SiteHero
        title="What to Expect"
        subtitle="Answers to questions you didn’t know you had — and some you probably should’ve asked."
        backgroundImage="/images/hero-faq.jpg"
        backgroundImageFallback="/images/stays/outdoor.jpg"
        backgroundAlt="What to Expect"
      />

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-14">
          {faqGroups.map((group, i) => (
            <div key={i}>
              <h2
                className={`flex items-center gap-2 text-2xl font-semibold mb-6 ${group.color}`}
              >
                <group.Icon className={FAQ_SECTION_ICON} aria-hidden />
                {group.heading}
              </h2>
              <div className="space-y-4">
                {group.qs.map((item, j) => (
                  <Accordion key={j} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4 font-serif text-gray-800">Still curious?</h2>
        <p className="text-lg mb-8 text-gray-600">
          Reach out with your questions — we’ll give it to you straight.
        </p>
        <a
          href="/guest-experiences"
          className="inline-block bg-orange-600 text-white px-10 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl hover:bg-orange-700 transition"
        >
          Start Your Lark →
        </a>
      </section>

      <Footer />
    </>
  );
}

function Accordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`transition-all duration-300 ease-in-out border rounded-xl shadow-sm overflow-hidden ${
        open ? "bg-white shadow-md" : "bg-white/60"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-4 text-lg font-medium text-gray-800 hover:text-brown-700 focus:outline-none flex justify-between items-center"
      >
        <span>{question}</span>
        <span className="text-2xl">{open ? "−" : "+"}</span>
      </button>
      <div
        className={`px-6 pb-4 text-gray-600 transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {answer}
      </div>
    </div>
  );
}

const faqGroups: {
  heading: string;
  color: string;
  Icon: LucideIcon;
  qs: { q: string; a: string }[];
}[] = [
  {
    heading: "The Experience",
    Icon: Map,
    color: "text-brown-700",
    qs: [
      {
        q: "What kind of experiences do you offer?",
        a: "Custom ones. Dirt bikes, BBQs, paddleboarding, pool lounging, local eats — we shape it around what you’re into.",
      },
      {
        q: "Can I stay overnight?",
        a: "We can’t advertise that — but let’s just say you won’t be kicked out at sundown. Ask us directly.",
      },
      {
        q: "What’s included in the base package?",
        a: "No fixed packages. You tell us what you want, and we’ll make it awesome.",
      },
    ],
  },
  {
    heading: "Booking & Planning",
    Icon: CalendarDays,
    color: "text-orange-700",
    qs: [
      {
        q: "How do I book an experience?",
        a: "Use the “Start Your Lark” button or email us. We'll figure it out together.",
      },
      {
        q: "Do you require a deposit?",
        a: "Depends on the scale. Small groups? Usually not. Bigger plans? We'll chat.",
      },
      {
        q: "Is this suitable for bachelor/bachelorette parties or small weddings?",
        a: "Absolutely. We just ask that you respect the space — and the neighbors.",
      },
    ],
  },
  {
    heading: "Comfort & Amenities",
    Icon: House,
    color: "text-teal-700",
    qs: [
      {
        q: "Is there a pool?",
        a: "Yes — with a slide. Bring trunks, not cannonballs (just kidding, cannonballs welcome).",
      },
      {
        q: "Can I work remotely from the property?",
        a: "Yes. We’ve got Wi-Fi, a private office, and some solid remote work vibes.",
      },
      {
        q: "What’s the food situation?",
        a: "BBQs, stocked kitchen, and local hookups. We know chefs if you want to get fancy.",
      },
    ],
  },
  {
    heading: "Activities & Add-Ons",
    Icon: Compass,
    color: "text-brown-700",
    qs: [
      {
        q: "Can I bring my dirt bike or outdoor gear?",
        a: "100%. We’ve got trails and a truck to get you there.",
      },
      {
        q: "What about wine tours or spa services?",
        a: "Yes — mobile massage, nails, wine tasting, yoga. You name it.",
      },
      {
        q: "Is shooting allowed?",
        a: "We don’t advertise that, but if you’re licensed and responsible, we can talk.",
      },
    ],
  },
  {
    heading: "Stuff You Should Know",
    Icon: Info,
    color: "text-orange-700",
    qs: [
      {
        q: "Is this family-friendly?",
        a: "Some events, yes. Others... maybe not. Ask us and we’ll steer you right.",
      },
      {
        q: "Do you allow pets?",
        a: "Case-by-case. We love dogs — just don’t bring a circus.",
      },
      {
        q: "What’s the cancellation policy?",
        a: "Be cool, give us some notice. We’re human.",
      },
    ],
  },
];
