import React from "react";
import Footer from "../components/Footer";

export default function StartYourLark() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] w-full overflow-hidden">
        <img
          src="/images/hero-start.jpg"
          alt="Start Hero"
          className="absolute inset-0 w-full h-full object-cover scale-105 transform transition-all duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-5xl font-bold text-center px-4 font-serif animate-fade-in">
            Start Your Lark
          </h1>
        </div>
      </section>

      {/* Intro Text */}
      <section className="bg-white py-16 px-6 text-center text-gray-800">
        <div className="max-w-2xl mx-auto space-y-6">
          <p className="text-xl">
            No dropdowns. No templates. Just tell us what kind of chaos, calm, or curiosity you're chasing.
          </p>
          <p className="text-lg text-gray-600">
            Whether you’re planning a chill lake weekend, a wine-fueled escape, or a dirt bike mission into the bush — we want to hear from you.
          </p>
          <p className="text-lg font-light text-gray-500 italic">
            The more you share, the better we can build your perfect Lark.
          </p>
        </div>
      </section>

      {/* Email CTA */}
      <section className="bg-gray-100 py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 font-serif">Let’s Talk</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto">
          Shoot us an email with a bit about you, your group, and what you’re into. We’ll take it from there.
        </p>
        <a
          href="mailto:hello@elklark.com"
          className="inline-block bg-teal-700 text-white px-10 py-4 rounded-xl text-lg shadow-lg hover:bg-teal-800 hover:shadow-xl transition"
        >
          Email Us: hello@elklark.com
        </a>
        <p className="text-sm text-gray-500 mt-6 italic">
          Not into email? Tape a note to a beer can and toss it into Kalamalka. We’ll find it.
        </p>
      </section>

      {/* Optional Quote Strip */}
      <section className="bg-white py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-3 text-gray-600 italic text-md">
          <p>“Bachelor party with dirt bikes? Easy.”</p>
          <p>“Wine tour that ends in a pool party? Done.”</p>
          <p>“Need to chill and stare at the lake? Respect.”</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
