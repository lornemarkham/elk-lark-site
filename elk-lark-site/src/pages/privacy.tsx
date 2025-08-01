import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

export default function About() {
  return (
    <>
      {/* Mini Hero Section */}
      <section className="relative h-72 w-full">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
          alt="Okanagan Nature"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-4xl md:text-5xl font-bold font-serif text-center px-4">
            Privacy Policy
          </h1>
        </div>
      </section>

      {/* About Section */}
      <div className="bg-white text-gray-800 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <p className="mb-4">
            We respect your privacy. Any information you submit through our forms
            (like name, email, phone) will only be used to respond to your inquiries
            or provide our services. We will never sell or share your information
            without your consent.
          </p>
          <p className="mb-4">
            If you have questions, please contact us at 
            <a href="elklarknow@gmail.com" className="underline ml-1">
              elklarknow@gmail.com
            </a>.
          </p>
          <p>Last updated: July 9, 2025</p>
        </div>
      </div>

    
      <Footer />
    </>
  );
}
