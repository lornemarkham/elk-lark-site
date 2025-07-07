import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";

export default function StrategyLark() {
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
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 font-serif">Work Smart. Live Well.</h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed">
          Strategy Lark blends focused work time with Okanagan leisure. 
          Whether you're coding poolside, brainstorming with your team, or recharging between deadlines — this escape keeps your momentum flowing.
        </p>
      </section>

      {/* CTA Section */}
      <section className="bg-[#F3EFEA] py-16 text-center px-6">
        <h3 className="text-3xl md:text-4xl font-serif mb-4">Your workspace, reimagined</h3>
        <p className="max-w-2xl mx-auto text-lg mb-6">
          Strategy Lark is custom-built for modern thinkers and makers. 
          We keep it flexible — you bring the hustle, we’ll bring the rest.
        </p>
        <Link to="/start">
          <button className="bg-strategy hover:bg-teal-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-md transition">
            Start Your Lark
          </button>
        </Link>
      </section>

      <Footer />
    </>
  );
}
