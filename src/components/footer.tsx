import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Logo + tagline */}
        <div className="space-y-2">
          <img
            src="/logo-white.png"
            alt="ELK Lark Logo"
            className="h-12"
          />
          <p className="text-sm text-gray-400">For Adventure – In the Heart of the Okanagan</p>
        </div>

        {/* Navigation */}
        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Explore</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/about" className="hover:underline">The ELK Story</Link></li>
            <li><Link to="/experience" className="hover:underline">Your Experience</Link></li>
            <li><Link to="/basecamp" className="hover:underline">Basecamp</Link></li>
            <li><Link to="/faq" className="hover:underline">What to Expect</Link></li>
            <li><Link to="/start" className="hover:underline">Start Your Lark</Link></li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Connect</h4>
          <p className="text-sm text-gray-400">Email: hello@elklark.com</p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-amber-600">Instagram</a>
            <a href="#" className="hover:text-amber-600">Facebook</a>
            <a href="#" className="hover:text-amber-600">TikTok</a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} ELK Lark. All rights reserved. Experiences only. BNB licensing pending.
      </div>
    </footer>
  );
}
