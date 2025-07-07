import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";

export default function RestoreLark() {
  return (
    <>
      {/* Mini Hero */}
      <section className="relative h-[40vh] w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/videos/restore.mp4"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-5xl font-bold text-center px-4 font-serif">
            Restore Lark
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-20 px-6 text-center text-gray-800">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 font-serif">Unwind & Recharge</h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed">
          Restore Lark is your invitation to slow down and savour the Okanagan lifestyle. 
          Whether it’s a peaceful paddle, a beach afternoon, or a relaxing wine tour — we tailor each day to your mood.
        </p>
      </section>

      {/* CTA Section */}
      <section className="bg-[#F3EFEA] py-16 text-center px-6">
        <h3 className="text-3xl md:text-4xl font-serif mb-4">Every guest deserves their own escape</h3>
        <p className="max-w-2xl mx-auto text-lg mb-6">
          Restore Lark is flexible, effortless, and designed around you. 
          Just reach out — and we’ll create something worth dreaming about.
        </p>
        <Link to="/start">
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-md transition">
            Start Your Lark
          </button>
        </Link>
      </section>

      <Footer />
    </>
  );
}
