import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

import logo from "../assets/elk-lark-logo.png";

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { label: "The ELK Story", to: "/about" },
    { label: "Your Experience", to: "/experience" },
    { label: "Basecamp", to: "/basecamp" },
    { label: "What to Expect", to: "/faq" },
  ];

  const linkStyles = (isActive: boolean) =>
    `relative transition-all duration-300 px-1
     ${isActive ? "text-amber-600 font-semibold after:w-full" : "text-black after:w-0"}
     after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-amber-600 after:transition-all after:duration-300 hover:after:w-full`;

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src={logo} alt="ELK Lark logo" className="h-10 w-auto" />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 text-lg font-light">
        {navItems.map(({ label, to }) => (
          <NavLink key={to} to={to} className={({ isActive }) => linkStyles(isActive)}>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* CTA Button */}
      <Link
        to="/start"
        className="hidden md:inline-block ml-6 px-5 py-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-semibold transition"
      >
        Start Your Lark
      </Link>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden"
        onClick={() => setIsMobileOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md border-t mt-2 flex flex-col items-start px-6 py-4 gap-4 text-lg font-light md:hidden z-40">
          {navItems.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `block w-full ${linkStyles(isActive)} text-left`
              }
            >
              {label}
            </NavLink>
          ))}
          {/* Mobile-only CTA */}
          <Link
            to="/start"
            onClick={() => setIsMobileOpen(false)}
            className="block w-full mt-2 px-5 py-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-semibold text-center transition"
          >
            Start Your Lark
          </Link>
        </div>
      )}
    </header>
  );
}
