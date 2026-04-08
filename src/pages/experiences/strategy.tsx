import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";
import { useSeason } from "../../state/SeasonContext";

export default function StrategyLark() {
  const { season } = useSeason();

  return (
    <>
      {/* Mini Hero */}
      <section className="relative h-[40vh] w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/videos/strategy.mp4"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-5xl font-bold text-center px-4 font-serif">
            Strategy Lark
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-20 px-6 text-center text-gray-800">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 font-serif">
          {season === "winter"
            ? "Think Clearly. Build Quietly."
            : "Work Smart. Live Well."}
        </h2>

        <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-700">
          {season === "winter"
            ? "Strategy Lark in winter is about focus without pressure. Fewer distractions, quieter days, and long blocks of uninterrupted thinking. Bring your ideas, your work, or your half-built plans — this is a place to slow down just enough to move forward properly."
            : "Strategy Lark blends focused work time with the Okanagan lifestyle. Whether you're coding by the pool, whiteboarding with your team, or carving out space to think between meetings, this escape keeps your momentum flowing."}
        </p>
      </section>

      {/* What It’s For */}
      <section className="bg-gray-50 py-20 px-6 text-center text-gray-800">
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold font-serif">
            Built for People Who Build Things
          </h3>

          <p className="text-lg text-gray-700">
            Strategy Lark is designed for founders, builders, product teams, and curious minds
            who want space to work — without the stiffness of a conference room or the noise of a coworking floor.
          </p>

          <p className="text-lg text-gray-700">
            This isn’t about grinding harder. It’s about thinking better, collaborating honestly,
            and letting good ideas breathe long enough to become real ones.
          </p>
        </div>
      </section>

      {/* Environment / Vibe */}
      <section className="bg-white py-20 px-6 text-center text-gray-800">
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold font-serif">
            The Right Environment Changes Everything
          </h3>

          <p className="text-lg text-gray-700">
            Work sessions happen where they make sense — at a table, on a couch, in the garage,
            or outside when the weather cooperates.
          </p>

          <p className="text-lg text-gray-700">
            {season === "winter"
              ? "Winter brings quieter energy, warm fires, and fewer interruptions. Perfect for deep work, long conversations, and serious progress."
              : "Summer brings light, movement, and space to reset between sessions. Work hard, step away, come back clearer."}
          </p>

          <p className="text-lg text-gray-700">
            Strategy Lark adapts to your flow, not the other way around.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-strategy text-white py-20 px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-serif mb-4">
          {season === "winter"
            ? "Your Quiet Season Starts Here"
            : "Your Workspace, Reimagined"}
        </h3>

        <p className="max-w-2xl mx-auto text-lg mb-6">
          {season === "winter"
            ? "If you’re looking for fewer distractions and more clarity, Strategy Lark offers a rare kind of winter focus."
            : "Strategy Lark is flexible, intentional, and designed around how modern teams actually work."}
        </p>

        <a
          href="mailto:hello@elklark.com"
          className="inline-block bg-black hover:bg-white hover:text-black text-white px-6 py-3 rounded-2xl font-semibold transition"
        >
          Start a Conversation
        </a>
      </section>

      <Footer />
    </>
  );
}