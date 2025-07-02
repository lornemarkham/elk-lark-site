import React from "react";
import Footer from "../components/footer";

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
            Looking to escape for a day? A weekend? Something in between?
          </p>
          <p className="text-lg text-gray-600">
            Whether it’s a BBQ, a lakeside recharge, or just a pool day with a solid vibe — tell us what you’re after.
          </p>
          <p className="text-lg text-gray-600">
            Some folks come for the afternoon. Others stay a little longer. We don’t ask too many questions.
          </p>
          <p className="text-md font-light text-gray-500 italic">
            If we like your vibe, we’ll build you a Lark.
          </p>
        </div>
      </section>

      {/* Email CTA */}
      <section className="bg-gray-100 py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 font-serif">Reach Out</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto">
          Shoot us a note about your group, what you're into, and when you're thinking. We’ll take it from there.
        </p>
        <a
          href="mailto:elklarknow@gmail.com"
          className="inline-block bg-teal-700 text-white px-10 py-4 rounded-xl text-lg shadow-lg hover:bg-teal-800 hover:shadow-xl transition"
        >
          Email Us: elklarknow@gmail.com
        </a>
        <p className="text-sm text-gray-500 mt-6 italic">
          Not into email? Tape a note to a beer can and toss it into Kalamalka. We’ll find it.
        </p>
      </section>

      {/* Quote Strip */}
      <section className="bg-white py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-3 text-gray-600 italic text-md">
          <p>“We came for the view. Stayed for the fire pit.”</p>
          <p>“Brought beers and a Bluetooth speaker. That was enough.”</p>
          <p>“I didn’t plan to sleep over. But I didn’t plan to leave either.”</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
