import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import SeasonToggle from "./SeasonToggle";
import logo from "../assets/elk-lark-logo.png";
import { planPageTypeFromPathname, trackPlanCtaClick } from "../lib/analytics";

const HEADER_PLAN_CTA = "Plan Your Retreat" as const;
const HEADER_START_PATH = "/plan-your-retreat" as const;

const EXPERIENCES_MENU = [
  { label: "Wellness Retreats", to: "/wellness-retreats", dataExperienceType: "wellness" as const },
  { label: "Micro Weddings", to: "/micro-weddings", dataExperienceType: "wedding" as const },
  { label: "Group Getaways", to: "/group-getaways", dataExperienceType: "group" as const },
];

function headerNavLinkAttrs(ctaText: string, destination: string, experienceType: string) {
  return {
    "data-analytics": "cta_click",
    "data-cta-location": "header_nav",
    "data-cta-text": ctaText,
    "data-destination": destination,
    "data-experience-type": experienceType,
  } as const;
}

const EXPERIENCES_PATHS = ["/wellness-retreats", "/micro-weddings", "/group-getaways", "/experience"] as const;

const AFTER_EXPERIENCES = [
  { label: "Basecamp", to: "/basecamp" },
  { label: "How It Works", to: "/faq" },
] as const;

function renderExperiencesMenuItems(
  navLinkClass: (isActive: boolean) => string,
  onNavigate?: () => void
) {
  return EXPERIENCES_MENU.map((entry) => {
    return (
      <NavLink
        key={entry.to}
        to={entry.to}
        onClick={onNavigate}
        className={({ isActive }) => navLinkClass(isActive)}
        {...headerNavLinkAttrs(entry.label, entry.to, entry.dataExperienceType)}
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
  const [desktopExperiencesOpen, setDesktopExperiencesOpen] = useState(false);

  const isExperiencesSectionActive = EXPERIENCES_PATHS.some((p) => location.pathname === p);

  const linkStyles = (isActive: boolean) =>
    `relative transition-all duration-300 px-1
     ${isActive ? "text-amber-600 font-semibold after:w-full" : "text-black after:w-0"}
     after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-amber-600 after:transition-all after:duration-300 hover:after:w-full`;

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
    setMobileExperiencesOpen(false);
  };

  const closeDesktopDropdown = () => {
    setDesktopExperiencesOpen(false);
  };

  const desktopDropdownLinkClass = (isActive: boolean) =>
    `block px-4 py-2.5 text-base transition-colors
     ${isActive ? "bg-amber-50 text-amber-700 font-semibold" : "text-gray-800 hover:bg-stone-50"}`;

  const mobileDropdownLinkClass = (isActive: boolean) =>
    `block py-3 pl-5 text-lg transition-colors ${
      isActive ? "text-amber-700 font-medium" : "text-gray-700 hover:text-gray-900"
    }`;

  const mobileNavLinkClass = (isActive: boolean) =>
    `block w-full py-3 text-left text-2xl leading-tight transition-colors ${
      isActive ? "text-amber-700 font-medium" : "text-gray-800"
    }`;

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center" {...headerNavLinkAttrs("ELK Lark logo", "/", "general")}>
          <img src={logo} alt="ELK Lark logo" className="h-10 w-auto" />
        </Link>
        <div className="hidden md:block">
          <SeasonToggle variant="underline" size="sm" />
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-6 text-lg font-light">
        <NavLink
          to="/about"
          onMouseEnter={closeDesktopDropdown}
          onFocus={closeDesktopDropdown}
          className={({ isActive }) => linkStyles(isActive)}
          {...headerNavLinkAttrs("The ELK Story", "/about", "general")}
        >
          The ELK Story
        </NavLink>

        <div
          className="relative"
          onMouseEnter={() => setDesktopExperiencesOpen(true)}
          onMouseLeave={closeDesktopDropdown}
          onFocusCapture={() => setDesktopExperiencesOpen(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              closeDesktopDropdown();
            }
          }}
        >
          <NavLink
            to="/experience"
            className={`relative flex items-center gap-1 px-1 transition-all duration-300 outline-none
              ${isExperiencesSectionActive ? "text-amber-600 font-semibold" : "text-black"}
              after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-amber-600 after:transition-all after:duration-300
              ${isExperiencesSectionActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`}
            aria-haspopup="menu"
            aria-expanded={desktopExperiencesOpen}
            {...headerNavLinkAttrs("Experiences", "/experience", "general")}
          >
            Experiences
            <ChevronDownIcon className="h-4 w-4 opacity-70" aria-hidden />
          </NavLink>
          <div
            className={`absolute left-0 top-full z-50 pt-2 transition-all duration-100 ${
              desktopExperiencesOpen
                ? "translate-y-0 opacity-100 pointer-events-auto"
                : "translate-y-0.5 opacity-0 pointer-events-none"
            }`}
          >
            <div className="min-w-[220px] rounded-lg border border-stone-200 bg-white py-2 shadow-md">
              {renderExperiencesMenuItems(desktopDropdownLinkClass, closeDesktopDropdown)}
            </div>
          </div>
        </div>

        {AFTER_EXPERIENCES.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            onMouseEnter={closeDesktopDropdown}
            onFocus={closeDesktopDropdown}
            className={({ isActive }) => linkStyles(isActive)}
            {...headerNavLinkAttrs(label, to, to === "/basecamp" ? "basecamp" : "general")}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <Link
        to={HEADER_START_PATH}
        onClick={() =>
          trackPlanCtaClick({
            cta_text: HEADER_PLAN_CTA,
            cta_context: "nav",
            page_type: planPageTypeFromPathname(location.pathname),
            destination: HEADER_START_PATH,
            from_path: location.pathname,
          })
        }
        onMouseEnter={closeDesktopDropdown}
        onFocus={closeDesktopDropdown}
        className="hidden md:inline-block ml-6 px-5 py-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-semibold transition"
        data-analytics="cta_click"
        data-cta-location="header_cta"
        data-cta-text={HEADER_PLAN_CTA}
        data-destination={HEADER_START_PATH}
        data-experience-type="general"
      >
        {HEADER_PLAN_CTA}
      </Link>

      <button
        className="md:hidden text-stone-800 transition-colors hover:text-amber-600"
        onClick={() => setIsMobileOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
      </button>

      {isMobileOpen && (
        <div className="absolute top-full left-0 z-40 mt-0 flex w-full flex-col items-start gap-1 border-t bg-white px-6 pb-5 pt-4 shadow-md md:hidden">
          <NavLink
            to="/about"
            onClick={closeMobileMenu}
            className={({ isActive }) => mobileNavLinkClass(isActive)}
            {...headerNavLinkAttrs("The ELK Story", "/about", "general")}
          >
            The ELK Story
          </NavLink>

          <div className="w-full">
            <button
              type="button"
              onClick={() => setMobileExperiencesOpen((o) => !o)}
              className={`flex w-full items-center justify-between py-3 text-left text-2xl leading-tight transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:ring-offset-2 ${
                isExperiencesSectionActive ? "text-amber-600 font-medium" : "text-gray-800"
              }`}
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
              <div id="mobile-experiences-subnav" className="mt-1 flex flex-col space-y-3">
                {renderExperiencesMenuItems(mobileDropdownLinkClass, closeMobileMenu)}
              </div>
            )}
          </div>

          {AFTER_EXPERIENCES.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMobileMenu}
              className={({ isActive }) => mobileNavLinkClass(isActive)}
              {...headerNavLinkAttrs(label, to, to === "/basecamp" ? "basecamp" : "general")}
            >
              {label}
            </NavLink>
          ))}

          <div className="mt-3 w-full border-t border-stone-200 pt-3">
            <Link
              to={HEADER_START_PATH}
              onClick={() => {
                trackPlanCtaClick({
                  cta_text: HEADER_PLAN_CTA,
                  cta_context: "nav",
                  page_type: planPageTypeFromPathname(location.pathname),
                  destination: HEADER_START_PATH,
                  from_path: location.pathname,
                });
                closeMobileMenu();
              }}
              className="block w-full rounded-full bg-amber-600 px-5 py-3 text-center text-lg font-semibold text-white transition hover:bg-amber-700"
              data-analytics="cta_click"
              data-cta-location="header_cta"
              data-cta-text={HEADER_PLAN_CTA}
              data-destination={HEADER_START_PATH}
              data-experience-type="general"
            >
              {HEADER_PLAN_CTA}
            </Link>
          </div>
          <div className="mt-4">
            <SeasonToggle variant="underline" size="sm" className="text-stone-500" />
          </div>
        </div>
      )}
    </header>
  );
}
