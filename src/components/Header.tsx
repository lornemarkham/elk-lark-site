import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import SeasonToggle from "./SeasonToggle";
import logo from "../assets/elk-lark-logo.png";

type ExperiencesMenuEntry =
  | { kind: "link"; label: string; to: string }
  | { kind: "divider" };

const EXPERIENCES_MENU: ExperiencesMenuEntry[] = [
  { kind: "link", label: "Wellness Retreats", to: "/wellness-retreats" },
  { kind: "link", label: "Micro Weddings", to: "/micro-weddings" },
  { kind: "link", label: "Group Getaways", to: "/group-getaways" },
  { kind: "divider" },
  { kind: "link", label: "Plan Your Experience", to: "/experience" },
];

const EXPERIENCES_PATHS = ["/wellness-retreats", "/micro-weddings", "/group-getaways", "/experience"] as const;

const AFTER_EXPERIENCES = [
  { label: "Basecamp", to: "/basecamp" },
  { label: "The Lark Life", to: "/the-lark-life" },
  { label: "What to Expect", to: "/faq" },
  { label: "Get in Touch", to: "/contact" },
] as const;

function renderExperiencesMenuItems(
  navLinkClass: (isActive: boolean) => string,
  onNavigate?: () => void
) {
  return EXPERIENCES_MENU.map((entry, i) => {
    if (entry.kind === "divider") {
      return (
        <div
          key={`exp-div-${i}`}
          className="mx-2 my-1 border-t border-stone-200"
          role="separator"
        />
      );
    }
    return (
      <NavLink
        key={entry.to}
        to={entry.to}
        onClick={onNavigate}
        className={({ isActive }) => navLinkClass(isActive)}
      >
        {entry.label}
      </NavLink>
    );
  });
}

export default function Header() {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileExperiencesOpen, setMobileExperiencesOpen] = useState(false);

  const isExperiencesSectionActive = EXPERIENCES_PATHS.some((p) => location.pathname === p);

  const linkStyles = (isActive: boolean) =>
    `relative transition-all duration-300 px-1
     ${isActive ? "text-amber-600 font-semibold after:w-full" : "text-black after:w-0"}
     after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-amber-600 after:transition-all after:duration-300 hover:after:w-full`;

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
    setMobileExperiencesOpen(false);
  };

  const desktopDropdownLinkClass = (isActive: boolean) =>
    `block px-4 py-2.5 text-base transition-colors
     ${isActive ? "bg-amber-50 text-amber-700 font-semibold" : "text-gray-800 hover:bg-stone-50"}`;

  const mobileDropdownLinkClass = (isActive: boolean) =>
    `block py-2 text-base ${isActive ? "text-amber-600 font-semibold" : "text-gray-700"}`;

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="ELK Lark logo" className="h-10 w-auto" />
        </Link>
        <div className="hidden md:block">
          <SeasonToggle variant="underline" size="sm" />
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-6 text-lg font-light">
        <NavLink to="/about" className={({ isActive }) => linkStyles(isActive)}>
          The ELK Story
        </NavLink>

        <div className="relative group">
          <button
            type="button"
            className={`relative flex items-center gap-1 px-1 transition-all duration-300 outline-none
              ${isExperiencesSectionActive ? "text-amber-600 font-semibold" : "text-black"}
              after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-amber-600 after:transition-all after:duration-300
              ${isExperiencesSectionActive ? "after:w-full" : "after:w-0 group-hover:after:w-full"}`}
            aria-haspopup="menu"
          >
            Experiences
            <ChevronDownIcon className="h-4 w-4 opacity-70" aria-hidden />
          </button>
          <div
            className="absolute left-0 top-full z-50 pt-2 translate-y-0.5 opacity-0 pointer-events-none transition-all duration-150
              group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto
              group-focus-within:translate-y-0 group-focus-within:opacity-100 group-focus-within:pointer-events-auto"
          >
            <div className="min-w-[220px] rounded-lg border border-stone-200 bg-white py-2 shadow-md">
              {renderExperiencesMenuItems(desktopDropdownLinkClass)}
            </div>
          </div>
        </div>

        {AFTER_EXPERIENCES.map(({ label, to }) => (
          <NavLink key={to} to={to} className={({ isActive }) => linkStyles(isActive)}>
            {label}
          </NavLink>
        ))}
      </nav>

      <Link
        to="/guest-experiences"
        className="hidden md:inline-block ml-6 px-5 py-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-semibold transition"
      >
        Start Your Lark
      </Link>

      <button
        className="md:hidden"
        onClick={() => setIsMobileOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
      </button>

      {isMobileOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md border-t mt-2 flex flex-col items-start px-6 py-4 gap-2 text-lg font-light md:hidden z-40">
          <NavLink
            to="/about"
            onClick={closeMobileMenu}
            className={({ isActive }) => `block w-full py-2 ${linkStyles(isActive)} text-left`}
          >
            The ELK Story
          </NavLink>

          <div className="w-full">
            <button
              type="button"
              onClick={() => setMobileExperiencesOpen((o) => !o)}
              className={`flex w-full items-center justify-between py-2 text-left ${linkStyles(isExperiencesSectionActive)}`}
              aria-expanded={mobileExperiencesOpen}
              aria-controls="mobile-experiences-subnav"
            >
              <span>Experiences</span>
              <ChevronDownIcon
                className={`h-5 w-5 shrink-0 transition-transform ${mobileExperiencesOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            {mobileExperiencesOpen && (
              <div id="mobile-experiences-subnav" className="ml-3 flex flex-col border-l border-stone-200 pl-3">
                {renderExperiencesMenuItems(mobileDropdownLinkClass, closeMobileMenu)}
              </div>
            )}
          </div>

          {AFTER_EXPERIENCES.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMobileMenu}
              className={({ isActive }) => `block w-full py-2 ${linkStyles(isActive)} text-left`}
            >
              {label}
            </NavLink>
          ))}

          <Link
            to="/guest-experiences"
            onClick={closeMobileMenu}
            className="block w-full mt-2 px-5 py-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-semibold text-center transition"
          >
            Start Your Lark
          </Link>
          <SeasonToggle size="sm" />
        </div>
      )}
    </header>
  );
}
